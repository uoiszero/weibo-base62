import pkg from "./package.json";
import json from "rollup-plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";

export default {
  input: "./index.js",
  output: {
    dir: './lib',
    sourcemap: true,
    file: pkg.module,
    format: 'umd'
  },
  plugins: [
    json(),
    commonjs({
      include: /node_modules/,
    }),
    resolve({
      preferBuiltins: true,
      jsnext: true,
      main: true,
      brower: true,
    }),
    //typescript(),
    //eslint(),
    babel({ exclude: "node_modules/**" }),
    terser(),
    filesize()
  ],
};