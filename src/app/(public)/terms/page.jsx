'use client';

import { Card, CardContent } from '@/components/ui/card';

 

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-center">Terms of Service</h1>
        <Card>
          <CardContent className="p-8 prose max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using the Japanese Education Platform, you agree to be bound by these Terms of Service.</p>
            
            <h2>2. Services</h2>
            <p>We provide Japanese language courses, study abroad counseling, visa assistance, and related educational services.</p>
            
            <h2>3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
            
            <h2>4. Payments</h2>
            <p>All payments are processed securely through our payment partners. Refunds are subject to our refund policy.</p>
            
            <h2>5. Privacy</h2>
            <p>Your privacy is important to us. Please refer to our Privacy Policy for details on how we handle your data.</p>
            
            <h2>6. Contact</h2>
            <p>For any questions regarding these terms, please contact us at legal@japaneseedu.com.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
