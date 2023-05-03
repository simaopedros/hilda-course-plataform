/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
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
