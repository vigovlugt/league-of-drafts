const colors = require("tailwindcss/colors");

module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                dark: {
                    0: "#121212",
                    1: "#1E1E1E",
                    2: "#232323",
                    3: "#252525",
                    4: "#272727",
                    6: "#2C2C2C",
                    8: "#2E2E2E",
                    12: "#333333",
                    16: "#363636",
                    24: "#383838",
                },
                winrate: {
                    shiggo: "#ff4e50",
                    meh: "#fcb1b2",
                    okay: colors.gray[50],
                    good: "#7ea4f4",
                    great: "#3273fa",
                    volxd: "#ff9b00",
                },
                light: "#E7E5E8",
                primary: "#65E25E",
                gray: colors.trueGray,
            },
            fontFamily: {
                header: "'Oswald', sans-serif",
                body: "sans-serif",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
