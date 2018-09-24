import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import { uglify as uglifyJS } from 'rollup-plugin-uglify'
import uglifyES from 'rollup-plugin-uglify-es'
import gzip from 'rollup-plugin-gzip'

function createRollupConfig(moduleFormat, productive) {
  return {
    input: 'src/main/js-react-layout.ts',

    output: {
      file: productive
        ? `dist/js-react-layout.${moduleFormat}.production.js`
        : `dist/js-react-layout.${moduleFormat}.development.js`,

      format: moduleFormat,
      name: 'jsReactLayout', 
      sourcemap: productive ? false : 'inline',

      globals: {
        'js-react-utils': 'jsReactUtils',
        'js-spec': 'jsSpec',
        'react': 'React'
      }
    },

    external: ['react', 'js-react-utils', 'js-spec'],

    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
      typescript({
        exclude: 'node_modules/**'
      }),
      replace({
        exclude: 'node_modules/**',
        
        values: {
          'process.env.NODE_ENV': productive ? "'production'" : "'development'"
        }
      }),
      productive && (moduleFormat === 'esm' ? uglifyES() : uglifyJS()),
      productive && gzip()
    ],
  }
}

const configs = []

for (const format of ['umd', 'cjs', 'amd', 'esm']) {
  for (const productive of [true, false]) {
    configs.push(createRollupConfig(format, productive))
  }
}

export default configs
