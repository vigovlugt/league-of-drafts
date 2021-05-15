const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    onlyCompileBundledFiles: true,
                },
            },
            {
                test: /\.csv$/,
                loader: "csv-loader",
                options: {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true,
                },
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "leagueOfDrafts",
        libraryTarget: "umd",
        globalObject: 'this',
    },
};
