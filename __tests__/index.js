import path from 'path';

import pluginTester from 'babel-plugin-tester'

import transformHtmlImportToString from '..'

pluginTester({
  plugin: transformHtmlImportToString,
  pluginName: 'transform-file-imports-to-string',
  fixtures: path.join(__dirname, '__fixtures__'),
  tests: {
    /* your test objects */
  },
})