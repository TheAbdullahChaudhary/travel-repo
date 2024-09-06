const esbuild = require('esbuild');
const postcssPlugin = require('esbuild-plugin-postcss2').default;

esbuild.build({
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outfile: 'app/assets/builds/application.js',
  plugins: [
    postcssPlugin({
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    }),
  ],
}).catch(() => process.exit(1));