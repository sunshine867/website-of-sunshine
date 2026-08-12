export default function manifest() {
  return {
    name: 'Sunshine - AI Education Platform',
    short_name: 'Sunshine',
    description:
      'Enterprise AI Education ERP + CRM + LMS + CMS + Finance Platform',

    start_url: '/',
    display: 'standalone',

    background_color: '#ffffff',
    theme_color: '#000000',

    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
