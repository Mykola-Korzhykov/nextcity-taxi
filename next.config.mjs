/** @type {import('next').NextConfig} */

import { resolve } from "path";
import nextPWA from "next-pwa";

import { fileURLToPath } from "url";
import { dirname } from "path";

// Импортируем createProxyMiddleware
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: { domains: ["localhost"] },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Прокси для API-запросов
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": resolve(__dirname, "src/styles"),
      "@resources": resolve(__dirname, "src/styles/resources"),
      "@variables": resolve(__dirname, "src/styles/resources/variables"),
      "@mixins": resolve(__dirname, "src/styles/resources/mixins"),
      "@rfs": resolve(__dirname, "node_modules/rfs/scss"),
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        "babel-loader",
        {
          loader: "react-svg-loader",
          options: {
            svgo: {
              plugins: [{ removeDimensions: true, removeViewBox: false }],
              floatPrecision: 2,
            },
          },
        },
      ],
    });

    // Добавляем промежуточный прокси для разработки
    if (!isServer) {
      config.devServer = config.devServer || {};
      config.devServer.proxy = {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
      };
    }

    return config;
  },
};

export default withPWA(nextConfig);

// /** @type {import('next').NextConfig} */

// import { resolve } from "path";
// import nextPWA from "next-pwa";

// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const withPWA = nextPWA({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });

// const nextConfig = {
//   reactStrictMode: false,
//   swcMinify: true,
//   images: { domains: ["localhost"] },
//   webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       "@styles": resolve(__dirname, "src/styles"),
//       "@resources": resolve(__dirname, "src/styles/resources"),
//       "@variables": resolve(__dirname, "src/styles/resources/variables"),
//       "@mixins": resolve(__dirname, "src/styles/resources/mixins"),
//       "@rfs": resolve(__dirname, "node_modules/rfs/scss"),
//     };

//     config.module.rules.push({
//       test: /\.svg$/,
//       use: [
//         "babel-loader",
//         {
//           loader: "react-svg-loader",
//           options: {
//             svgo: {
//               plugins: [{ removeDimensions: true, removeViewBox: false }],
//               floatPrecision: 2,
//             },
//           },
//         },
//       ],
//     });

//     return config;
//   },
// };

// export default withPWA(nextConfig);
