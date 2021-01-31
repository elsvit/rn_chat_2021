module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.tsx?', '.android.tsx?', '.js', '.ts', '.tsx', '.json'],
        alias: {'~': './src', assets: ['./assets/images']},
      },
    ],
  ],
};
