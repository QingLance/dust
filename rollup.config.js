import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import { terser } from 'rollup-plugin-terser';

export default {
    input: './src/index.js',
    output: [
        {
            name: 'dust',
            file: './dist/dust.esm.js',
            format: 'esm'
        },
        {
            name: 'dust',
            file: './dist/dust.js',
            format: 'umd'
        }
    ],
    plugins: [
        resolve({
            extensions: ['.js'],
        }),
        commonjs(),
        babel({
            extensions: ['.js'],
        }),
        terser()
    ]
};
