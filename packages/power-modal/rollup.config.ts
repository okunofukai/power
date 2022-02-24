import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";
// @ts-ignore
import pkg from "./package.json";

const config = [
	{
		input: pkg.source,
		output: [
			{
				file: pkg.main,
				exports: "named",
				format: "cjs",
				sourcemap: true,
			},
			{
				file: pkg.module,
				exports: "named",
				format: "es",
				sourcemap: true,
			},
		],
		external: [],
		plugins: [
			nodeResolve(),
			commonjs(),
			typescript({
				declaration: true,
				declarationDir: "types",
				tsconfig: "./tsconfig.json",
			}),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
				presets: [
					"@babel/preset-env",
					"@babel/preset-react",
					"@babel/preset-typescript",
					"@emotion/babel-preset-css-prop",
				],
				plugins: ["@emotion"],
			}),
			del({ targets: ["dist/**/*"] }),
		],
	},
	{
		input: "dist/types/index.d.ts",
		output: [
			{
				file: "dist/power-modal.d.ts",
				format: "esm",
			},
		],
		external: [/\.(css|scss)$/],
		plugins: [
			dts(),
			del({
				targets: ["dist/**/types"],
				hook: "buildEnd",
			}),
		],
	},
];

export default config;
