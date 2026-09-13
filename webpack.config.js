import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

export default {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
    },
    {
            test: /\.html$/i,
            loader: "html-loader",
    },
    {
            test: /\.(png|gif|jpeg|svg|jpg)$/i,
            use: [
                {
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'imgs'
                },
            },
        ],
    },
],
    },
};