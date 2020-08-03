const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte", "./src/**/*.html"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

const cssnano = require("cssnano")({
  preset: "default"
});

module.exports = {
    plugins: [
      require("postcss-import"),
      require("postcss-nested"),
      require("tailwindcss"),
      require("autoprefixer"),
      ...(process.env.NODE_ENV === "production"
        ? [purgecss, cssnano]
        : [])
    ],
  }