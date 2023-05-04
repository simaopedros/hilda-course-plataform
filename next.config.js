/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    NEXT_PUBLIC_FIREBASE_PRIVATE_KEY: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    // Adicione outras variáveis de ambiente necessárias aqui
  },
  // Algumas outras configurações aqui
  nextConfig,
  images: {
    domains: [
      'picsum.photos', 
      'localhost', 
      'pbs.twimg.com', 
      'ead.bureauveritas.com.br', 
      'www.laberit.com', 
      'www.iped.com.br', 
      'example.com'],
  },
};
