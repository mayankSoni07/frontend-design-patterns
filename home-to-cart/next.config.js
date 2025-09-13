/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CUSTOM_KEY: 'home-to-cart',
  },
  transpilePackages: ['frontend-common'],
  webpack: (config, { isServer }) => {
    // Ensure React is properly resolved for shared packages
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
    };
    
    // Ensure external packages use the same React instance
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        'react': 'React',
        'react-dom': 'ReactDOM',
      });
    }
    
    return config;
  },
}

module.exports = nextConfig
