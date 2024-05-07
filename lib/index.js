"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var loaderString = '!!file-loader!';
function isLoaderUrl(str) {
  return str.indexOf(loaderString) > -1;
}
function _default(_ref) {
  var typesData = _ref.types;
  return {
    visitor: {
      ExportDeclaration: {
        exit: function exit(path, state) {
          var node = path.node;
          if (node.source && isLoaderUrl(node.source.value)) {
            var dir = _path["default"].dirname(_path["default"].resolve(state.file.opts.filename));
            var filePath = node.source.value.replace(loaderString, ''); // remove loader keyword
            var absolutePath = _path["default"].resolve(dir, filePath);
            var fileData = _fs["default"].readFileSync(absolutePath, "utf8");
            var constPlaceholder = typesData.variableDeclaration("const", [typesData.variableDeclarator(typesData.identifier(node.specifiers[0].exported.name), typesData.stringLiteral(fileData))]);
            var nullPlaceholder = typesData.exportNamedDeclaration(null, [typesData.exportSpecifier(typesData.identifier(node.specifiers[0].exported.name), typesData.identifier(node.specifiers[0].exported.name))]);
            path.replaceWithMultiple([constPlaceholder, nullPlaceholder]);
          }
        }
      },
      ImportDeclaration: {
        exit: function exit(path, state) {
          var node = path.node;
          if (isLoaderUrl(node.source.value)) {
            var dir = _path["default"].dirname(_path["default"].resolve(state.file.opts.filename));
            var filePath = node.source.value.replace(loaderString, ''); // remove loader keyword
            var absolutePath = _path["default"].resolve(dir, filePath);
            var fileData = _fs["default"].readFileSync(absolutePath, "utf8");
            var constPlaceholder = typesData.variableDeclaration("const", [typesData.variableDeclarator(typesData.identifier(node.specifiers[0].local.name), typesData.stringLiteral(fileData))]);
            path.replaceWith(constPlaceholder);
          }
        }
      }
    }
  };
}