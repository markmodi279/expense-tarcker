import type { NextConfig } from "next";
import dns from "node:dns";

// Force Node.js on this machine to bypass the local Windows/ISP bug
if (typeof window === "undefined") {
  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;