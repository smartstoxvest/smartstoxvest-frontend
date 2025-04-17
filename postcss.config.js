// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': false,
      },
    }),
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};
