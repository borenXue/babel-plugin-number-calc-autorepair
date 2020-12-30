import { declare } from '@babel/helper-plugin-utils';
import { addNamed } from '@babel/helper-module-imports';

export default declare(({ assertVertion, types }, opts) => ({
  name: 'babel-plugin-number-calc-autorepair',
  visitor: {
    /**
     * +、-、*、/
     */
    BinaryExpression(nodePath, file) {
      const node = nodePath.node;

      // 注释豁免
      if (isImmunity(file.file.ast.comments, node)) return;

      if (types.isBinaryExpression(node, { operator: '+' })) {
        const funcName = addImport(file, 'accAdd', nodePath, types);
        nodePath.replaceWith(types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        ));
      }
      if (types.isBinaryExpression(node, { operator: '-' })) {
        const funcName = addImport(file, 'accSub', nodePath, types);
        nodePath.replaceWith(types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        ));
      }
      if (types.isBinaryExpression(node, { operator: '*' })) {
        const funcName = addImport(file, 'accMulti', nodePath, types);
        nodePath.replaceWith(types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        ));
      }
      if (types.isBinaryExpression(node, { operator: '/' })) {
        const funcName = addImport(file, 'accDiv', nodePath, types);
        nodePath.replaceWith(types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        ));
      }
      if (types.isBinaryExpression(node, { operator: '**' })) {
        const funcName = addImport(file, 'accExp', nodePath, types);
        nodePath.replaceWith(types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        ));
      }
    },

    /**
     * +=、-=、*=、/=
     */
    AssignmentExpression(nodePath, file) {
      const node = nodePath.node;

      // 注释豁免
      if (isImmunity(file.file.ast.comments, node)) return;

      if (types.isAssignmentExpression(node, { operator: '+=' })) {
        const funcName = addImport(file, 'accAdd', nodePath, types);
        nodePath.replaceWith(types.assignmentExpression('=', node.left, types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        )));
      }
      if (types.isAssignmentExpression(node, { operator: '-=' })) {
        const funcName = addImport(file, 'accSub', nodePath, types);
        nodePath.replaceWith(types.assignmentExpression('=', node.left, types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        )));
      }
      if (types.isAssignmentExpression(node, { operator: '*=' })) {
        const funcName = addImport(file, 'accMulti', nodePath, types);
        nodePath.replaceWith(types.assignmentExpression('=', node.left, types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        )));
      }
      if (types.isAssignmentExpression(node, { operator: '/=' })) {
        const funcName = addImport(file, 'accDiv', nodePath, types);
        nodePath.replaceWith(types.assignmentExpression('=', node.left, types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        )));
      }
      if (types.isAssignmentExpression(node, { operator: '**=' })) {
        const funcName = addImport(file, 'accExp', nodePath, types);
        nodePath.replaceWith(types.assignmentExpression('=', node.left, types.callExpression(
          types.identifier(funcName),
          [node.left, node.right]
        )));
      }
    }
  }
}));

function isImmunity(allComments, node) {
  const comments = (allComments || []).filter(comment => {
    // 文件级别
    if (comment.value.replace(/^\*/, '').trim() === 'babel-disable-autofix-file') return true;
    // Expession 级别
    if (comment.start < node.start || comment.end > node.end) return false;
    if (comment.value.replace(/^\*/, '').trim() === 'babel-disable-autofix') return true;
    // 不豁免
    return false;
  })

  if (comments.length > 0) return true;

  return false;
}

function addImport(file, key, nodePath, types) {
  const list = file.file.ast.program.body || [];
  const item = list.filter((item) => item.type === 'ImportDeclaration' && item.source.value === './number-acc.js')[0];
  if (item) {
    const existOne = item.specifiers.filter((item) => item.imported.type === 'Identifier' && item.imported.name === key)[0];
    if (!existOne) {
      const newOne = types.importSpecifier(types.identifier(`_${key}`), types.identifier(key))
      item.specifiers.push(newOne)
      return newOne.local.name
    }
    return existOne.local.name
  } else {
    return addNamed(nodePath, key, './number-acc.js').name
  }
}
