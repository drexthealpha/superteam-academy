import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /node_modules\/@hugeicons/,
        message: /Invalid DOM property/,
      },
    ];
    return config;
  },
};

export default withNextIntl(nextConfig);
