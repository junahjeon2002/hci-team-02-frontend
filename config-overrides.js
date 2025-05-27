const { override } = require('customize-cra');

module.exports = override(
  (config) => {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url"),
      "zlib": require.resolve("browserify-zlib"),
      "util": require.resolve("util")
    });
    config.resolve.fallback = fallback;
    return config;
  }
); 