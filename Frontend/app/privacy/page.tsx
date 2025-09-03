import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <Link href="/" className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        ← Back to Home
        </Link>


        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg leading-relaxed mb-4">
          Your privacy is important to us. At <span className="font-semibold">EasyConstruct</span>, 
          we collect only the information necessary to process your orders and improve our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Name and contact information</li>
          <li>Order and payment details</li>
          <li>Browsing and usage data</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">How We Use Your Data</h2>
        <p className="text-lg leading-relaxed mb-4">
          We use your data to provide a better shopping experience, process transactions, 
          and personalize our services. We do not sell or share your personal information 
          with third parties without your consent.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Your Rights</h2>
        <p className="text-lg leading-relaxed mb-4">
          You have the right to access, update, or request deletion of your personal data at any time.  
          For assistance, please contact us at{" "}
          <a
            href="mailto:support@easyconstruct.com"
            className="text-blue-600 underline hover:text-blue-800"
          >
            support@easyconstruct.com
          </a>.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: August 2025
        </p>
      </div>
    </div>
  );
}
