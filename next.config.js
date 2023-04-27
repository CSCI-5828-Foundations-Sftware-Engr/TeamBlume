module.exports = {
  images: {
    domains: ['pisces.bbystatic.com', 'i5.walmartimages.com']
  },
  async redirects() {
    return [
      {
        source: '/api/metrics',
        destination: '/metrics',
        permanent: true
      }
    ];
  },
  output: 'standalone'
};
