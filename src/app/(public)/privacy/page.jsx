import { Card, CardContent } from '@/components/ui/card';

 

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-center">Privacy Policy</h1>
        <Card>
          <CardContent className="p-8 prose max-w-none">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide when registering, including name, email, phone number, and educational background.</p>
            
            <h2>2. How We Use Your Information</h2>
            <p>Your information is used to provide and improve our services, communicate with you, and comply with legal obligations.</p>
            
            <h2>3. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access.</p>
            
            <h2>4. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with partner universities and service providers as necessary.</p>
            
            <h2>5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Contact us to exercise these rights.</p>
            
            <h2>6. Contact</h2>
            <p>For privacy concerns, contact us at privacy@japaneseedu.com.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}