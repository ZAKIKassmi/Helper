/** @type {import('next').NextConfig} */



const nextConfig = {
    experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
	webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    

    return config;
  },
  
};

export default nextConfig;
