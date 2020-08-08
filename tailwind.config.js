const customColor = {
  primary: {
    1: "#E7FDFC",
    2: "#B7FAF7",
    3: "#87F7F1",
    4: "#58F4EC",
    5: "#28F1E6",
    6: "#0ED7CD",
    7: "#0BA79F",
    8: "#087872",
    9: "#054844"
  },
  neutral: {
    1: "#D9D9D9",
    2: "#BFBFBF",
    3: "#A6A6A6",
    4: "#8C8C8C",
    5: "#737373",
    6: "#595959",
    7: "#404040",
    8: "#262626",
    9: "#0D0D0D"
  }
}

module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1600px'
    },
    extend: {
      colors: customColor,
      placeholderColor: customColor,
      fontSize: {
        '6xl': '5rem'
      },
      borderRadius: {
        '2xl': '1.25rem'
      },
      borderWidth: {
        '1': '1px'
      },
      height:{
        '96': '24rem',
        '128': '32rem',
      },
      maxWidth: {
        '2xs': '12.5rem',
        '7xl': '80rem'
      },
      maxHeight: {
        '2xs': '12rem'
      }
    },
    fontFamily: {
      'overpass': 'Overpass, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'open-sans': '"Open Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'playfair-display': '"Playfair Display", Georgia, Cambria, "Times New Roman", Times, serif'
    }
  },
  variants: ['responsive', 'hover', 'focus', 'group-hover', 'even', 'last', 'disabled'],
  plugins: [
    require('@tailwindcss/typography')
  ]
}
