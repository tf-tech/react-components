import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import packageJson from "./package.json" assert {type: "json"};
import scss from "rollup-plugin-scss";

export default [
    {
        input: "src/index.ts",
        external: [...Object.keys(packageJson.peerDependencies || {}), /^next/, 'prop-types', 'react-dom', /^primereact/, 'tslib'],
        output: [
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            resolve(),
            typescript({tsconfig: "./tsconfig.json"}),
            scss()
        ],
    },
    {
        input: "dist/index.d.ts",
        output: [{file: "dist/index.d.ts", format: "esm"}],
        external: [/\.scss$/],
        plugins: [dts()],
    },
];
