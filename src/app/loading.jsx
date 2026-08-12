export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full" />
          <div className="w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0" />
        </div>
        <p className="mt-4 text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}