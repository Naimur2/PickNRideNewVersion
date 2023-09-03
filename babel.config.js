module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "react-native-reanimated/plugin",
      [
          "module-resolver",
          {
              root: ["./"],
              alias: {
                  "@store": "./src/redux",
                  "@components": "./src/components",
                  "@screens": "./src/screens",
                  "@navigation": "./src/routes",
                  "@typedef": "./src/types",
                  "@theme": "./src/theme-config",
                  "@assets": "./assets",
                  "@config":"./config.ts",
                  "@hooks": "./src/hooks",
                  "@utils": "./src/utils",
                  "@layouts": "./src/layouts"
              },
          },
      ],
  ],
  };
};
