"use client";

type ShopFilterProps = {
  allServices: string[];
  selectedService?: string;
};

export default function ShopFilter({ allServices, selectedService }: ShopFilterProps) {
  return (
    <form method="GET" className="mb-8 flex flex-wrap gap-4 items-center">
      <label className="font-medium">Filter by Service:</label>
      <select
        name="service"
        defaultValue={selectedService || ""}
        className="border rounded px-3 py-2"
        onChange={e => e.currentTarget.form?.submit()}
      >
        <option value="">All</option>
        {allServices.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
    </form>
  );
}