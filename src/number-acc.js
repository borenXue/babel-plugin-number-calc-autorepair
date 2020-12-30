import { accAdd as accAddInner } from 'xtools_js/lib/number/index';

export { accDiv, accMulti, accSub } from 'xtools_js/lib/number/index';

export function accAdd(a, b) {
  if (typeof a === 'number') {
    return accAddInner(a, b)
  } else {
    return a +/* babel-disable-autofix */ b
  }
};
