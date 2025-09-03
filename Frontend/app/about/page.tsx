import Link from "next/link";

export default function AboutPage() {
  return (
     <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <Link href="/" className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        ← Back to Home
        </Link>


      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg leading-relaxed mb-4">
        Welcome to <span className="font-semibold">EasyConstruct</span>! 🚀  
        We are your one-stop destination for all things construction—whether it’s
        **building materials, modern furniture, or land listings**, we’ve got you covered. 
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission</h2>
      <p className="text-lg leading-relaxed mb-4">
        Our mission is to make construction simple, transparent, and affordable.  
        By bringing together trusted suppliers, architects, and service providers, 
        we empower homeowners, builders, and businesses to complete projects faster and smarter.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">What We Offer</h2>
      <ul className="list-disc pl-6 space-y-2 text-lg">
        <li>Wide range of **construction materials** at competitive prices.</li>
        <li>Curated collection of **furniture & interiors** for modern living.</li>
        <li>Verified **land listings** with location-based search.</li>
        <li>Expert services including **architectural designs** and **Vastu consultation**.</li>
        <li>Interactive **3D/VR visualizations** to plan your dream projects.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Why Choose Us?</h2>
      <p className="text-lg leading-relaxed mb-4">
        At EasyConstruct, we combine technology with expertise to simplify your journey.  
        From choosing the right material to visualizing your dream home, 
        our platform saves you time, money, and effort.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Our Vision</h2>
      <p className="text-lg leading-relaxed mb-4">
        We aim to become India’s most trusted digital platform for construction and real estate,  
        transforming the way people build, buy, and live.
      </p>
    </div>
    </div>
  );
}
