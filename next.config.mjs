/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add support for .html files
    config.module.rules.push({
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader', // You might need to install this if it's not included by default
          options: {
            minimize: true
          }
        }
      ]
    });

    // Optionally, include asset handling for other file types like .glb
    config.module.rules.push({
      test: /\.glb$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/models/',
        },
      },
    });

    return config;
  },
  images: {
    domains: ['aceternity.com'], // Add your domains for images
  },
};

// Use `export default` instead of `module.exports`
export default nextConfig;
