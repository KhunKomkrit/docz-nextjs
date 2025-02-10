const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Docz Component',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/bkfullstack/Works/docz-component/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Docz Component',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/bkfullstack/Works/docz-component',
          templates:
            '/Users/bkfullstack/Works/docz-component/node_modules/docz-core/dist/templates',
          docz: '/Users/bkfullstack/Works/docz-component/.docz',
          cache: '/Users/bkfullstack/Works/docz-component/.docz/.cache',
          app: '/Users/bkfullstack/Works/docz-component/.docz/app',
          appPackageJson:
            '/Users/bkfullstack/Works/docz-component/package.json',
          appTsConfig: '/Users/bkfullstack/Works/docz-component/tsconfig.json',
          gatsbyConfig:
            '/Users/bkfullstack/Works/docz-component/gatsby-config.js',
          gatsbyBrowser:
            '/Users/bkfullstack/Works/docz-component/gatsby-browser.js',
          gatsbyNode: '/Users/bkfullstack/Works/docz-component/gatsby-node.js',
          gatsbySSR: '/Users/bkfullstack/Works/docz-component/gatsby-ssr.js',
          importsJs:
            '/Users/bkfullstack/Works/docz-component/.docz/app/imports.js',
          rootJs: '/Users/bkfullstack/Works/docz-component/.docz/app/root.jsx',
          indexJs:
            '/Users/bkfullstack/Works/docz-component/.docz/app/index.jsx',
          indexHtml:
            '/Users/bkfullstack/Works/docz-component/.docz/app/index.html',
          db: '/Users/bkfullstack/Works/docz-component/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
