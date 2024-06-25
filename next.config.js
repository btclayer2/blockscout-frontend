const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZER === 'true',
});

const withRoutes = require('nextjs-routes/config')({
  outDir: 'nextjs',
});

const headers = require('./nextjs/headers');
const redirects = require('./nextjs/redirects');
const rewrites = require('./nextjs/rewrites');

const getBEVMWssUrlByBranch = () => {
  const branchName = process.env.CF_PAGES_BRANCH;

  switch (branchName) {
    case 'testnet':
      return 'wss://testnet.bevm.io/ws';
    case 'canary-mainnet':
      return 'wss://rpc-canary-1.bevm.io/ws';
    case 'canary-testnet':
      return 'wss://canary-testnet.bevm.io/ws';
    default:
      return 'wss://testnet.bevm.io/ws';
  }
};

const getBTCDecimalByBranch = () => {
  const branchName = process.env.CF_PAGES_BRANCH;

  switch (branchName) {
    case 'testnet':
      return 18;
    case 'canary-mainnet':
      return 8;
    case 'canary-testnet':
      return 8;
    default:
      return 18;
  }
};

const moduleExports = {
  env: {
    BEVM_WSS_URL: getBEVMWssUrlByBranch(),
    BTC_DECIMAL: getBTCDecimalByBranch(),
  },
  transpilePackages: [
    'react-syntax-highlighter',
    'swagger-client',
    'swagger-ui-react',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
      }),
    );
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [ '@svgr/webpack' ],
      },
    );
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },
  // NOTE: all config functions should be static and not depend on any environment variables
  // since all variables will be passed to the app only at runtime and there is now way to change Next.js config at this time
  // if you are stuck and strongly believe what you need some sort of flexibility here please fill free to join the discussion
  // https://github.com/blockscout/frontend/discussions/167
  rewrites,
  redirects,
  headers,
  // output: 'standalone',
  productionBrowserSourceMaps: true,
  experimental: {
    instrumentationHook: true,
  },
};

module.exports = withBundleAnalyzer(withRoutes(moduleExports));
