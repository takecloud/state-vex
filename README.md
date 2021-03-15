# state-vex

## Brief

轻量响应式的状态管理，可用作数据侦听。

一开始这个项目用于解决小程序的跨页面通讯问题。我已经相当常一段时间没有再写过小程序了。最近回顾文档，发现微信给小程序带来了许多不错的设计，其中就有用于解决跨页面通讯而新增的 EventChannel API。所以这个项目封存了。

## How

[🚀150行代码带你实现小程序中的数据侦听](https://juejin.cn/post/6844903845257183246)

## Usage

```js
const VX = require('state-vex').default
const vx = new VX()
const store = vx.store

vx.set('a.b', 'data')  // store: { a: { b: 'data' } }
vx.watch('a.b', [_ => console.log(`${_} is `), _ => console.log(_.toFixed(2))]) // 添加侦听回调
store.a.b = 3   // trigger callback console.log “3 is 3.00”
vx.del('a.b')   // 删除b属性，同时删除相应的回调函数
```

## Install

1. 安装v1分支代码: `cnpm install git://github.com/takecloud/state-vex.git#v1`
2. 引入后直接使用: `const vx = require('state-vex').default`

## DEV

1. `npm run dev`
2. `nodemon ./test/index.js`
