const _numberAcc = {}

function calcAdd(a, b) {
  return a + b;
}

function calcAll(a, b, c, d) {
  return a + b * c / d;
}



console.log('')
console.log('')

console.log(`+ : \t 2.24 + 2.22 = ${2.24 + 2.22} \t 不使用插件的计算结果: ${2.24 /*babel-disable-autofix*/+ 2.22}`)
console.log(`- : \t 2.24 - 2.22 = ${2.24 - 2.22} \t 不使用插件的计算结果: ${2.24 /*babel-disable-autofix*/- 2.22}`)
console.log(`* : \t 2.24 * 2.22 = ${2.24 * 2.22} \t 不使用插件的计算结果: ${2.24 /*babel-disable-autofix*/* 2.22}`)
console.log(`/ : \t 2.3 / 0.1 = ${2.3 / 0.1} \t 不使用插件的计算结果: ${2.3 /*babel-disable-autofix*// 0.1}`)
console.log(`/ : \t 2.3 / 100000 = ${2.3 / 100000} 不使用插件的计算结果: ${2.3 /*babel-disable-autofix*// 100000}`)
console.log('')


let val, val1;
val = val1 = 2.24;
console.log(`+= : \t 2.24 += 2.22 = ${val += 2.22} \t 不使用插件的计算结果: ${val1 /*babel-disable-autofix*/+= 2.22}`)
val = val1 = 2.24;
console.log(`-= : \t 2.24 -= 2.22 = ${val -= 2.22} \t 不使用插件的计算结果: ${val1 /*babel-disable-autofix*/-= 2.22}`)
val = val1 = 2.24;
console.log(`*= : \t 2.24 *= 2.22 = ${val *= 2.22} \t 不使用插件的计算结果: ${val1 /*babel-disable-autofix*/*= 2.22}`)
let valt, valt1;
valt = valt1 = 2.3
console.log(`/= : \t 2.3 /= 0.1 = ${valt /= 0.1} \t 不使用插件的计算结果: ${valt1 /*babel-disable-autofix*// 0.1}`)
valt = valt1 = 2.3
console.log(`/= : \t 2.3 /= 100000 = ${valt /= 100000} 不使用插件的计算结果: ${valt1 /*babel-disable-autofix*// 100000}`)


console.log('')
console.log('')
