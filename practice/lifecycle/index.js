import Vue from 'vue'

var app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  created () {
    console.log(this, 'created')
  },
  beforeMount () {
    console.log(this, 'beforeMount')
  },
  mounted () {
    console.log(this, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  // 与一个vue组件有关，后面讲解
  activated () {
    console.log(this, 'activated')
  },
  // 与一个vue组件有关，后面讲解
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  }
  // render (h) {
  //   // 这里手动抛出一个错误，来测试renderError方法
  //   throw new TypeError('render error')
  // },
  // renderError (h, err) {
  //   return h('div', {}, err)
  // },
  // errorCaptured () {
  //   // error会向上冒泡，并且正式环境可以用，捕捉所有的错误
  // }
})

// 挂载时候会执行 beforeMount mounted
app.$mount('#root')

// 有数据更新时会执行 beforeUpdate updated
// setInterval(() => {
//   app.text += 1
// }, 1000)

// 组件被销毁时会执行 beforeDestroy destroyed
// setTimeout(() => {
//   app.$destroy()
// }, 2000)
