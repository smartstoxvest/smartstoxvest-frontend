// postcss.config.js
module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': false,
      },
    },
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
