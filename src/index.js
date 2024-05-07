import fs from 'fs';
import nodePath from 'path';

const loaderString = '!!file-loader!';
function isLoaderUrl(str) {
  return str.indexOf(loaderString) > -1;
}

export default function ({ types: typesData }) {
  return {
    visitor: {
      ExportDeclaration: {
        exit: function (path, state) {
          const node = path.node;

          if (node.source && isLoaderUrl(node.source.value)) {
            const dir = nodePath.dirname(nodePath.resolve(state.file.opts.filename));
            const filePath = node.source.value.replace(loaderString, ''); // remove loader keyword
            const absolutePath = nodePath.resolve(dir, filePath);
            const fileData = fs.readFileSync(absolutePath, "utf8");

            const constPlaceholder = typesData.variableDeclaration("const", [
              typesData.variableDeclarator(
                typesData.identifier(node.specifiers[0].exported.name),
                typesData.stringLiteral(fileData)
              )
            ]);

            const nullPlaceholder = typesData.exportNamedDeclaration(null, [
              typesData.exportSpecifier(
                typesData.identifier(node.specifiers[0].exported.name),
                typesData.identifier(node.specifiers[0].exported.name)
              )
            ])

            path.replaceWithMultiple([constPlaceholder, nullPlaceholder]);
          }
        }
      },
      ImportDeclaration: {
        exit: function (path, state) {
          const node = path.node;

          if (isLoaderUrl(node.source.value)) {
            const dir = nodePath.dirname(nodePath.resolve(state.file.opts.filename));
            const filePath = node.source.value.replace(loaderString, ''); // remove loader keyword
            const absolutePath = nodePath.resolve(dir, filePath);
            const fileData = fs.readFileSync(absolutePath, "utf8");

            const constPlaceholder = typesData.variableDeclaration("const", [
              typesData.variableDeclarator(
                typesData.identifier(node.specifiers[0].local.name),
                typesData.stringLiteral(fileData)
              )
            ]);

            path.replaceWith(constPlaceholder);
          }
        }
      }
    }
  };
}