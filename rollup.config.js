import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import del from "rollup-plugin-delete";

import packageJson from "./package.json";

const external = Object.keys(packageJson.devDependencies || {}).concat(
  Object.keys(packageJson.peerDependencies || {}),
  ["react", "react-dom"], // Ensure React and ReactDOM are always treated as external
);

// Custom plugin to append the CSS import to the JS files
const injectCSSImport = () => {
  return {
    name: "inject-css-import",
    generateBundle(options, bundle) {
      const cssImportStatement = `import './style.css';\n`;

      Object.keys(bundle).forEach((fileName) => {
        if (fileName.endsWith(".js")) {
          const chunk = bundle[fileName];
          chunk.code = cssImportStatement + chunk.code;
        }
      });
    },
  };
};

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      del({ targets: "dist/*" }),
      peerDepsExternal(),
      resolve({
        extensions: [".ts", ".tsx", ".js"],
      }),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        modules: {
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
        extract: "style.css",
        minimize: true,
        use: ["sass"],
      }),
      injectCSSImport(),
    ],
    external,
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts(), del({ targets: "dist/tsconfig.tsbuildinfo" })],
    external: [/\.(css|less|scss)$/, "react", "react-dom"],
  },
];
