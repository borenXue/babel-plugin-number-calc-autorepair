# babel-plugin-number-calc-autorepair

* 自动修复 JavaScript 引擎中的浮点陷阱
* 支持基于注释的豁免, 可豁免整个文件或只豁免某处代码
* 自动修复的运算符: `+`、`-`、`*`、`/` 以及 `+=`、`-=`、`*=`、`/=`
* `TODO:` `待自动修复的运算符: `: `%`、`%=`、`++`、`--`

[使用示例](https://github.com/borenXue/babel-plugin-number-calc-autorepair/tree/main/test-demo): 运行 `npm install && npm run build`

<br/>

## 快速使用

安装依赖

```
npm i -D babel-plugin-number-calc-autorepair
```

配置 babel

```json
{
  "plugins": ["number-calc-autorepair"]
}
```


<br/>

## 代码转换示例

> 输入

```javascript
function calcAdd(a, b) {
  return a + b;
}

function calcAll(a, b, c, d) {
  return a + b * c / d;
}
```

> 输出

```javascript
// _numberAcc.accAdd: 内部会判断变量 a 的类型, 非数字类型时, 插件不做处理
// 导出对象名确保唯一性: 如果已有 _numberAcc 变量, 则导出对象命名为 _numberAcc2, 依次类推

var _numberAcc = require('babel-plugin-number-calc-autorepair/dist/number-acc.js');

function calcAdd(a, b) {
  return _numberAcc.accAdd(a, b);
}

function calcAll(a, b, c, d) {
  return _numberAcc.accAdd(a, _numberAcc.accDiv(_numberAcc.accMulti(b, c), d));
}
```


<br/>


## 豁免配置

* 豁免整个文件: 在文件头部添加`一行单独注释`即可, `/* babel-disable-autofix-file */`
* 豁免某处代码: 需确保注释在运算符左侧或右侧, `const a = 10 + /* xxbabel-disable-autofix */ 100`



## `number-acc.js` 文件实现

```javascript
import { accAdd as accAddInner } from 'xtools_js/lib/number/index';

export { accDiv, accMulti, accSub } from 'xtools_js/lib/number/index';

export function accAdd(a, b) {
  if (typeof a === 'number') {
    return accAddInner(a, b)
  } else {
    return a +/* babel-disable-autofix */ b
  }
};
```
