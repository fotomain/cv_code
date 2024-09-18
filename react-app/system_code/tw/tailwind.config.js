

/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

//DOC FONTS https://tailwindcss.com/docs/font-family

//google identity web color rgb(26,115,232)
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {

    screens: {
      'xs': '360px',

      'sm': '640px',

      'md': '768px',
      // => @media (min-width: 640px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },

    extend: {
      colors: {

        tw_primary: "#6cd04c",

        "hero-green": "#6cd04c",
        "main-black": "#000",
        "white-main": "#fff",
        darkslategray: "#484747",
        "herou-green-dots": "#6dcf4e",
        gray: "rgba(255, 255, 255, 0)",

        //=== menu
        "c-fuksija": "#e539e2",
        "c-active-green": "#6cd04c",
        darkgray: "#686464",
        "c-main-black": "#000",
        silver: "#bfbfbf",
        whitesmoke: "#f2f2f2",


      },
      spacing: {},
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        "f-menu-disktop": "Inter",
        inter_regular: ['Inter'],
        inter_light: ['InterLight'],
        oswald: "Oswald",
        "hammersmith-one": "'Hammersmith One'",
      },
      borderRadius: {
        "31xl": "50px",
      },
    },
    fontSize: {
      "11xl": "30px",
      "61xl": "80px",
      "21xl": "40px",
      "5xl": "24px",
      xs: "12px",
      smi: "13px",
      "26xl": "45px",
      "121xl": "140px",
      lg: "18px",
      inherit: "inherit",
      menu_cta_herow: "34px",
      menu_cta_title_dn: "20px",
    },
  },
  corePlugins: {
    preflight: false,
  },
};














//
//
// /** @type {import('tailwindcss').Config} */
//
// const defaultTheme = require('tailwindcss/defaultTheme')
//
// //DOC FONTS https://tailwindcss.com/docs/font-family
//
// //google identity web color rgb(26,115,232)
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//
//         tw_primary: "#6cd04c",
//
//         "hero-green": "#6cd04c",
//         "main-black": "#000",
//         "white-main": "#fff",
//         darkslategray: "#484747",
//         "herou-green-dots": "#6dcf4e",
//         gray: "rgba(255, 255, 255, 0)",
//
//         //=== menu
//         "c-fuksija": "#e539e2",
//         "c-active-green": "#6cd04c",
//         darkgray: "#686464",
//         "c-main-black": "#000",
//         silver: "#bfbfbf",
//         whitesmoke: "#f2f2f2",
//
//
//       },
//       spacing: {},
//       fontFamily: {
//         sans: ['Inter', ...defaultTheme.fontFamily.sans],
//         "f-menu-disktop": "Inter",
//         inter_regular: ['Inter'],
//         inter_light: ['InterLight'],
//         oswald: "Oswald",
//         "hammersmith-one": "'Hammersmith One'",
//       },
//       borderRadius: {
//         "31xl": "50px",
//       },
//     },
//     fontSize: {
//       "11xl": "30px",
//       "61xl": "80px",
//       "21xl": "40px",
//       "5xl": "24px",
//       xs: "12px",
//       smi: "13px",
//       "26xl": "45px",
//       "121xl": "140px",
//       lg: "18px",
//       xl: "24px",
//       inherit: "inherit",
//       menu_cta_herow: "34px",
//       menu_cta_title_dn: "20px",
//     },
//   },
//   corePlugins: {
//     preflight: false,
//   },
// };
