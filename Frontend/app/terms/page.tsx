import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <Link href="/" className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        ← Back to Home
        </Link>


        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg leading-relaxed mb-4">
          By using <span className="font-semibold">EasyConstruct</span> services, 
          you agree to comply with the following terms and conditions:
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">General Terms</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Orders are subject to product availability and pricing at the time of purchase.</li>
          <li>Payments must be completed and verified prior to shipping.</li>
          <li>Returns and refunds follow our official return policy guidelines.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">User Responsibilities</h2>
        <p className="text-lg leading-relaxed mb-4">
          You agree to provide accurate information during registration and checkout, 
          and to use our services only for lawful purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
        <p className="text-lg leading-relaxed mb-4">
          EasyConstruct is not liable for delays, damages, or losses beyond our control.  
          Our maximum liability is limited to the amount paid for the order in question.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Updates to Terms</h2>
        <p className="text-lg leading-relaxed mb-4">
          We may update these Terms of Service from time to time. Continued use of our services 
          after updates constitutes acceptance of the new terms.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: August 2025
        </p>
      </div>
    </div>
  );
}
