// frontend/postcss.config.cjs

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // 👈 new correct plugin name
    autoprefixer: {},
  },
}
