module.exports = {
  images: {
    domains: ['pisces.bbystatic.com']
  },
  async redirects() {
    return [
      {
        source: '/api/metrics',
        destination: '/metrics',
        permanent: true
      }
    ];
  }
};
