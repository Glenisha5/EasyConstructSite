import mongoose from "mongoose";
import ShopFilter from "./ShopFilter";

function getUniqueServices(products: any[]) {
  const services = new Set<string>();
  products.forEach((shop) => {
    let offered = shop["Services Offered"];
    if (typeof offered === "string") {
      const cleaned = offered.replace(/[\[\]"]+/g, "");
      cleaned.split(",").forEach((s: string) => {
        const trimmed = s.trim();
        if (trimmed && isNaN(Number(trimmed))) {
          services.add(trimmed);
        }
      });
    }
  });
  return Array.from(services);
}

export default async function ShopsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // ✅ Read from environment variable
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in .env.local");
  }

  await mongoose.connect(mongoUri, { dbName: "EasyConstruct" });
  await mongoose.connection.asPromise();

  const db = mongoose.connection.db;
  if (!db) {
    return <div className="text-red-600">Database connection not established.</div>;
  }

  const selectedService =
    typeof searchParams?.service === "string" ? searchParams.service : "";

  const mongoFilter =
    selectedService && selectedService !== ""
      ? { "Services Offered": { $regex: selectedService, $options: "i" } }
      : {};

  const products = await db
    .collection("Products")
    .find(mongoFilter)
    .limit(50)
    .toArray();

  const allSample = await db.collection("Products").find({}).limit(200).toArray();
  const allServices = getUniqueServices(allSample);

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Shops</h2>
        <ShopFilter allServices={allServices} selectedService={selectedService} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((shop: any) => (
            <div
              key={shop._id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start border hover:shadow-2xl transition-shadow duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold">{shop["Dealer Name"]}</h3>
                {shop["Rating (Max 5)"] && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                    ★ {shop["Rating (Max 5)"]}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-1">{shop["Address"]}</p>
              <p className="mb-1">
                <a
                  href={shop["Dealer URL"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Visit Dealer
                </a>
              </p>
              <p className="mb-1">Phone: {shop["Phone Number"] || "N/A"}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {typeof shop["Services Offered"] === "string"
                  ? shop["Services Offered"].split(",").map((service: string) => (
                      <span
                        key={service}
                        className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {service.trim()}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No shops found for this service.
          </div>
        )}
      </main>
    </div>
  );
}
