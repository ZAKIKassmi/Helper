/** @type {import('next').NextConfig} */



const nextConfig = {
    experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"],
    // ppr: true,
	},
  
	webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    

    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },  

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};



export default nextConfig;
