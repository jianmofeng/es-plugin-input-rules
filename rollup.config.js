import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript'
// import { terser } from "rollup-plugin-terser";

export default {
    input: 'lib/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    // sourceMap: 'inline',
    plugins: [
        resolve(),
        commonjs({
            include: /node_modules/
        }),
        
        typescript(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            externalHelpers: true
        }),
        // terser(),
        json({
            // 默认情况下将解析所有JSON文件,
            // 但您可以专门包含/排除文件
            // include: 'node_modules/**',
            exclude: [ 'node_modules' ],

            // 对于 tree-shaking, 属性将声明为npm install --save-dev babel-helpers
            // 变量, 使用 `var` 或者 `const`
            preferConst: true, // 默认是 false

            // 为生成的默认导出指定缩进 —
            // 默认为 't'
            indent: '  ',

            // 忽略缩进并生成最小的代码
            compact: true, // 默认是 false

            // 为JSON对象的每个属性生成一个命名导出
            namedExports: true // 默认是 true
        })
    ],
    //排除第三方依赖
    // external: ["moment"]
};