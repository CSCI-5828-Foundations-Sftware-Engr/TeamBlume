const newrelicDeps = [
  '@newrelic/next',
  'newrelic',
  'semver',
  'json-stringify-safe',
  'readable-stream',
  'inherits',
  'util-deprecate',
  'lru-cache',
  'yallist',
  'async',
  'concat-stream',
  'buffer-from',
  'https-proxy-agent',
  'debug',
  'ms',
  'agent-base',
  '@tyriar/fibonacci-heap'
];

module.exports = {
  images: {
    domains: ['pisces.bbystatic.com', 'i5.walmartimages.com']
  },
  unstable_includeFiles: newrelicDeps.map(
    d => `node_modules/${d}/**/*.+(js|json)`
  ),
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
