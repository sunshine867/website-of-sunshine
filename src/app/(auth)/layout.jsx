export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {children}
    </div>
  );
}