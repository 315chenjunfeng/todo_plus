import Vue from 'vue'

// 方法1
// new Vue({
//   el: '#root',
//   template: '<div>practice xxx</div>'
// })

// 方法2
const app = new Vue({
  template: '<div>{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  },
  watch: {
    text (newText, oldText) {
      console.log(`${newText} : ${oldText}`)
    }
  }
})

app.$mount('#root')

// setInterval(() => {
//   app.text += 1
// }, 1000)

// var unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)

// $once是只监听一次，$on是一直监听
// app.$on('test', (a, b) => {
//   console.log(a + `test ${a} ${b} emit` + b)
// })
// app.$emit('test', 1, 2)

// obj.a未定义，这是更改值页面不会有变化
// 使用$forceUpdate强制组件重新渲染，不推荐使用
// var i = 0
// setInterval(() => {
//   i++
//   app.obj.a = i
//   app.$forceUpdate()
// }, 1000)

// $set替代$forceUpdate方案
// var i = 0
// setInterval(() => {
//   i++
//   app.$set(app.obj, 'a', i)
// }, 1000)
// app.$delete()与$set()对应，强制删除

// $nextTick

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)

// console.log(app.$root === app)

// console.log(app.$children)

// 插槽
// console.log(app.$slots)
// console.log(app.$scopedSlots)

// 快速定位到某一个节点
// <div ref='div'>{{text}}</div>
// console.log(app.$refs)

// console.log(app.$isServer)

// 第一次渲染时1，后面就是'new render function'了
// setInterval(() => {
//   app.text += 1
// }, 1000)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
