/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  env: {
    NEXT_PUBLIC_FIREBASE_PRIVATE_KEY:
      process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL:
      process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    NEXT_PUBLIC_FIREBASE_DATABASE_URL:
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    NEXT_PUBLIC_GMAIL_USER: process.env.NEXT_PUBLIC_GMAIL_USER,
    NEXT_PUBLIC_GMAIL_PASSWORD: process.env.NEXT_PUBLIC_GMAIL_PASSWORD,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    // Adicione outras variáveis de ambiente necessárias aqui
  },
  // Algumas outras configurações aqui

  images: {
    domains: [
      "picsum.photos",
      "localhost",
      "pbs.twimg.com",
      "ead.bureauveritas.com.br",
      "www.laberit.com",
      "www.iped.com.br",
      "example.com",
      "doodleipsum.com",
    ],
  },
};
