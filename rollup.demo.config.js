import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/demo/demo.tsx',
  output: {
    file: './build/demo.js',
    format: 'umd',

    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'js-react-utils': 'jsReactUtils',
      'js-spec': 'jsSpec',
      'js-spec/dev-only': 'jsSpec'
    }
  },

  external: [],

  plugins: [
    resolve({
      main: true,
      module: true,
      jsnext: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**',

      namedExports: {
        'js-react-utils': [
          'defineComponent',
          'defineContext',
          'isElementOfType',
          'isNode',
          'withChildren'
        ],
        'js-spec/dev-only': [
          'Spec'
        ]
      },
    }),
    replace({
      // exclude: 'node_modules/**', // TODO
      
      values: {
        'process.env.NODE_ENV': "'development'"
      }
    }),
    typescript(),
    //serve({
    //  open: true,
    //  contentBase: '.',
    //  openPage: '/src/demo/demo.html'
    //}),
    //livereload({
    //  watch: ['src/demo', 'build']
    //})
  ]
}
