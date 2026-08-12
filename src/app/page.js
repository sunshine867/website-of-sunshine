import PublicLayout from './(public)/layout';
import HomePageClient from './components/home-page-client';

export default function Page() {
  return (
    <PublicLayout>
      <HomePageContent />
    </PublicLayout>
  );
}
