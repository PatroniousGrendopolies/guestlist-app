'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-4xl px-xl">
      <div className="container-sm">
        <div className="card">
          <div className="card-body">
            <h1 className="text-3xl font-light mb-xl">Privacy Policy</h1>
            
            <div className="space-y-lg text-sm text-gray-700">
              <p>
                <strong>Last updated:</strong> July 5, 2025
              </p>
              
              <div>
                <h2 className="text-lg font-medium text-black mb-md">Information We Collect</h2>
                <p>
                  When you join our guest list, we collect your name, email, phone number, and optionally your Instagram handle. This information is used solely for event management and communication purposes.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-black mb-md">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-sm">
                  <li>To manage guest lists for events</li>
                  <li>To send event updates and confirmations via text and email</li>
                  <li>To verify your identity at the door</li>
                  <li>To improve our service and event experience</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-black mb-md">Information Sharing</h2>
                <p>
                  We do not sell, trade, or share your personal information with third parties except as necessary to provide our services (such as sending text messages or emails).
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-black mb-md">Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-black mb-md">Your Rights</h2>
                <p>
                  You may request to update or delete your information at any time by contacting us. You can also opt out of text messages by replying STOP to any message.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-black mb-md">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at privacy@datcha.com
                </p>
              </div>
            </div>
            
            <div className="mt-xl pt-lg border-t border-gray-200">
              <button 
                onClick={() => window.close()}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}