const path = require('path')

module.exports = {
//   async headers() {
//     return [
//     {
//       source: "/:path*",
//       headers: [
//      { key: "Access-Control-Allow-Credentials", value: "true" },
//      { key: "Access-Control-Allow-Origin", value: "https://localhost:5010" },
//      { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//      { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
//     ]
//     }
//     ]
// },
// async rewrites() {
//   return [
//     {
//       source: '/:path*',
//       destination: 'https://localhost:5010/:path*',
//     },
//   ]
// },
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
