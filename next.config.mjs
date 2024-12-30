/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//         port: "",
//         pathname: "**",
//       },
//     ],
//   },
// };
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**", // Allow paths starting with /f/
      },
    ],
  },
};

export default nextConfig;
