- This plugin is fork from [babel-plugin-transform-html-import-to-string](https://github.com/yeiniel/babel-plugin-transform-html-import-to-string)

# babel-plugin-transform-file-imports-to-string

- import any type of files to string in any environment running babel browser / node / react-native 

## Installation

```sh
$ npm install babel-plugin-transform-file-imports-to-string
```
## Usage

### Via `.babelrc` or `babel.config.js` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-file-imports-to-string"]
}
```

### Via CLI

```sh
$ babel --plugins transform-file-imports-to-string script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-file-imports-to-string"]
});
```


## Usage Examples

- import html files
```html
<h1>Hello</h1>
```

> Import

```js
import html from '!!file-loader!./example.html';
```


- import js files as string
```js
const str = 'Hello, World !!';
console.log(str);

```

> Import

```js
import html from '!!file-loader!./example.js';
```
