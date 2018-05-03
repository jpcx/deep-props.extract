/**
 * @author Justin Collier <jpcxme@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/deep-props|GitHub}
 */

'use strict'

/**
 * Builds the markdown documentation from the JSDoc output using the turndown module. Valid as of JSDoc v3.5.5, turndown v4.0.2, and turndown-plugin-gfm v1.0.1.
 *
 * @private
 * @see {@link https://www.npmjs.com/package/turndown-plugin-gfm}
 */

const fs = require('fs')

/**
 * Formats 4-spaced code blocks for markdown.
 *
 * @private
 * @param   {string} string - Search string.
 * @returns {string} Formatted string.
 */
const formatCodeBlocks = string => string.replace(
  /^((?:(?:[ ]{4}|\t).*\n)+)/gm,
  '```js\n$1```'
).replace(
  /^ {4}/gm,
  ''
)

/**
 * Removes JSDoc Header.
 *
 * @private
 * @param   {string} string - Search string.
 * @returns {string} Formatted string.
 */
const removeJSDocHeader = string => string.replace(
  /^.*JSDoc.*\n\n/,
  ''
)

/**
 * Removes JSDoc Footer.
 *
 * @private
 * @param   {string} string - Search string.
 * @returns {string} Formatted string.
 */
const removeJSDocFooter = string => string.replace(
  /(?:Documentation generated by \[JSDoc )[\s\S]*/,
  ''
).trim()

/**
 * Replaces source code urls with GitHub links.
 *
 * @private
 * @param   {string} string - Search string.
 * @param   {string} URL - URL to GitHub repository.
 * @returns {string} Formatted string.
 */
const formatSourceCodeURLs = (string, URL) => string.split(
  /([\w\d]*\.js\.html#line)/g
).reduce(
  (formatted, block, i) => {
    if (i === 0) {
      return block
    } else if ((i + 1) % 2 === 0) {
      return (
        formatted +
        URL +
        block.replace(
          /_/g,
          '/'
        ).replace(
          /line/g,
          'L'
        ).replace(
          /\.js\.html/g,
          '.js'
        )
      )
    } else if (i % 2 === 0) {
      return formatted + block
    } else {
      return formatted
    }
  },
  ''
).split(
  /([\w\d]*\.js\.html)/g
).reduce(
  (formatted, block, i) => {
    if (i === 0) {
      return block
    } else if ((i + 1) % 2 === 0) {
      return (
        formatted +
        URL +
        block.replace(
          /_/g,
          '/'
        ).replace(
          /\.js\.html/g,
          '.js'
        )
      )
    } else if (i % 2 === 0) {
      return formatted + block
    } else {
      return formatted
    }
  },
  ''
)

/**
 * Replaces JSDoc index.html footer with links to GitHub main README.md and creates separator.
 *
 * @private
 * @param   {string} string - Search string.
 * @param   {string} URL - URL to GitHub repository.
 * @returns {string} Formatted string.
 */
const replaceIndexFooter = (string, URL) => string.replace(
  /\[Home\]\(index\.html/g,
  '<hr>[Home](' + URL + 'README.md'
)

/**
 * Replaces links to module HTML pages.
 *
 * @private
 * @param   {string} string - Search string.
 * @param   {string} URL - URL to GitHub repository.
 * @param   {string} MODULES_PATH - Path to modules library.
 * @param   {string} TOP_NAMESPACE - Highest-level namespace in project.
 * @returns {string} Formatted string.
 */
const replaceModuleLinks = (string, URL, MODULES_PATH, TOP_NAMESPACE) => string.split(
  /(]\([\w\d\-._~:/?#[\]@!$&'()*\\+,;=`.]*.html)/g
).reduce(
  (formatted, block, i) => {
    if (i === 0) {
      return block
    } else if ((i + 1) % 2 === 0) {
      if (block.match(TOP_NAMESPACE + '.module_') !== null) {
        return (
          formatted +
          '](' +
          URL +
          MODULES_PATH +
          block.replace(
            /^]\(/,
            ''
          ).replace(
            TOP_NAMESPACE + '.module_',
            ''
          ).replace(
            /\.html/g,
            ''
          ) +
          '/docs/API.md'
        )
      } else if (block.match(TOP_NAMESPACE + '.html') !== null) {
        return (
          formatted +
          '](' +
          URL +
          block.replace(
            /^]\(/,
            ''
          ).replace(
            TOP_NAMESPACE + '.html',
            'docs/global.md'
          )
        )
      } else {
        return (
          formatted +
          '](' +
          URL +
          MODULES_PATH +
          block.replace(
            /^]\(/,
            ''
          ).replace(
            TOP_NAMESPACE + '.',
            ''
          ).replace(
            /\.html/g,
            ''
          ) +
          '/docs/global.md'
        )
      }
    } else if (i % 2 === 0) {
      return formatted + block
    } else {
      return formatted
    }
  },
  ''
)

/**
 * Escapes brackets used to signify return values.
 *
 * @private
 * @param   {string} string - Search string.
 * @returns {string} Formatted string.
 */
const fixReturnBrackets = string => string.replace(
  /→ {/g,
  '→ \\{'
)

/**
 * Fixes 'optional' attribute in parameter / property tables.
 *
 * @private
 * @param   {string} string - Search string.
 * @returns {string} Formatted string.
 */
const fixOptionalTags = string => string.replace(
  /<optional>/g,
  '\\<optional>'
)

/**
 * Fixes incorrectly split table breaks.
 *
 * @private
 * @param   {string} string - Search string.
 * @returns {string} Formatted string.
 */
const fixTableLineBreaks = string => string.replace(
  / \n^ \|/gm,
  '|'
)

/**
 * Escapes asterix bullets.
 *
 * @private
 * @param   {string} string - Search String.
 * @returns {string} Formatted string.
 */
const fixAsterixBullets = string => string.replace(
  /\* {3}\*/g,
  '*   \\*'
)

const TurndownService = require('turndown')
const turndownPluginGfm = require('turndown-plugin-gfm')

const gfm = turndownPluginGfm.gfm
const turndownService = new TurndownService()
turndownService.use(gfm)

const HTML = {}
const md = {}
HTML.extract = {}
md.extract = {}

HTML.global = fs.readFileSync(
  process.cwd() + '/build/jsdoc/deep-props.html',
  'utf8'
)

HTML.extract.API = fs.readFileSync(
  process.cwd() + '/build/jsdoc/module-extract.html',
  'utf8'
)

HTML.extract.global = fs.readFileSync(
  process.cwd() + '/build/jsdoc/deep-props.extract.html',
  'utf8'
)

md.global = turndownService.turndown(
  HTML.global
)

md.extract.API = turndownService.turndown(
  HTML.extract.API
)

md.extract.global = turndownService.turndown(
  HTML.extract.global
)

/**
 * Applies all formatting rules to all entries in md object. Modifies object entries.
 *
 * @private
 * @param {Object} md - Object containing MD texts.
 */
const applyAllRules = md => {
  const URL = 'https://github.com/jpcx/deep-props/blob/master/'
  const MODULES_PATH = 'libs/'
  const TOP_NAMESPACE = 'deep-props'

  /**
   * Recursively searches through markdown object in order to apply transformations to text properties.
   *
   * @private
   * @param {Object} object - Object containing MD.
   */
  const recurse = object => {
    for (let key in object) {
      if (typeof object[key] === 'string') {
        object[key] = formatCodeBlocks(object[key])
        object[key] = removeJSDocHeader(object[key])
        object[key] = removeJSDocFooter(object[key])
        object[key] = formatSourceCodeURLs(object[key], URL)
        object[key] = replaceIndexFooter(object[key], URL)
        object[key] = replaceModuleLinks(object[key], URL, MODULES_PATH, TOP_NAMESPACE)
        object[key] = fixReturnBrackets(object[key])
        object[key] = fixOptionalTags(object[key])
        object[key] = fixTableLineBreaks(object[key])
        object[key] = fixAsterixBullets(object[key])
      } else {
        recurse(object[key])
      }
    }
  }

  recurse(md)
}

applyAllRules(md)

fs.writeFileSync(
  process.cwd() + '/docs/global.md',
  md.global,
  'utf8'
)

fs.writeFileSync(
  process.cwd() + '/libs/extract/docs/API.md',
  md.extract.API,
  'utf8'
)

fs.writeFileSync(
  process.cwd() + '/libs/extract/docs/global.md',
  md.extract.global,
  'utf8'
)
