/* eslint-disable no-console */

// 清理控制台信息
// const exec = require('child_process').exec
// exec('cls')

// 功能测试
const VX = require('../dist/vx.js')
const vx = new VX()
// const store = vx.store

const cb = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('aaa')
      resolve()
    }, 1000)
  })
}

vx.set('a')
vx.watch('a', cb, { immediately: true }).then(() => {
  console.log('a done')
})
vx.set('b')
vx.watch('a', _ => _, { immediately: true }).then(() => {
  console.log('b done')
})
