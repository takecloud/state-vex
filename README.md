# state-vex

!这个项目初期是想用于解决小程序的跨页面通讯问题。我已经相当常一段时间没有再写过小程序了，最近回顾文档，发现微信给小程序带来了许多不错的设计。其中 EventChannel 就是专用于解决跨页面通讯而新增的 API。那这个项目用处已经不大了，到此为止。

轻量响应式的状态管理, 可用作数据侦听.

## usage

```js
const VX = require('state-vex').default
const vx = new VX()
const store = vx.store

vx.set('a.b', 'data')  // store: { a: { b: 'data' } }
vx.watch('a.b', [_ => console.log(`${_} is `), _ => console.log(_.toFixed(2))]) // 添加侦听回调
store.a.b = 3   // 3 is 3.00
vx.del('a.b')   // store: { a: {} } 删除b属性同时删除相应回调函数
```

更多特性参见##more小节

## use in projects

1. 安装v1分支代码: `cnpm install git://github.com/takecloud/state-vex.git#v1`
2. 引入后直接使用: `const vx = require('state-vex').default`

## dev

1. `npm run dev`
2. `nodemon ./test/index.js`

## more

### 多级侦听

```js
vx.watch('a.b')
store.a.b = 'data'  // 此时会触发'a'上绑定的侦听器
```
