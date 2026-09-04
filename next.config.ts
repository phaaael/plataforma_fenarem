import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "tb2958.vteximg.com.br", pathname: "/arquivos/ids/**" }],
  },
};
export default nextConfig;
