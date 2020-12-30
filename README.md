<red>测试中, 生产环境请等待 1.0 版本</red>

<br/>

# babel-plugin-number-calc-autorepair


自动修复 JavaScript 引擎中的浮点陷阱, 支持基于注释的豁免, 可豁免整个文件或只豁免某处代码

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
function calc(a, b) { return a + b - 10 }
```

> 输出

```javascript
// number-acc.js 代码实现可参考下方
import { accAdd as _accAdd, accSub as _accSub } from "./number-acc.js";

function calc(a, b) { return _accSub(_accAdd(a, b), 10) }
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
