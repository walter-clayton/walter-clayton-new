const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    config.module.rules.push({
      test: /\.node$/,
      use: [
        {
          loader: "node-loader",
        },
      ],
    });
    return config;
  },
  packages: [
    "@frontity/tiny-router",
    "@frontity/html2react",
    {
      name: "my-custom-package",
      state: {},
    },
  ],
};
