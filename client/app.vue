<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{counter}} {{fullName}}</p>
    <router-link :to="{name: 'app'}">app</router-link>
    <router-link to="/login">login</router-link>

    <!-- <Todo></Todo> -->
    <transition name="fade">
      <router-view />
    </transition>

    <Footer></Footer>

    <!-- <router-view name="a" /> -->
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
  import Header from './layout/header.vue';
  import Footer from './layout/footer.jsx';
  import Todo from './views/todo/todo.vue';

  export default {
    components: {
      Header,
      Footer,
      Todo
    },
    mounted () {
      console.log(this.$store)

      // this.$store.dispatch('updateCountAsync', {
      //   num: 5,
      //   time: 2000
      // })
      this.updateCountAsync({
        num: 5,
        time: 2000
      })

      // var i = 0
      // setInterval(() => {
      //   this.$store.commit('updateCount', ++i)
      //   this.updateCount(++i);
      // }, 1000)

      // console.log(this.$route)
    },
    methods: {
      ...mapActions(['updateCountAsync']),
      ...mapMutations(['updateCount'])
    },
    computed : {
      ...mapState({
        // counter: 'count'
        counter: (state) => state.count
      }),
      // 使用...语法需要安装 npm i babel-preset-stage-1 -D
      // ...mapState(['count']),
      // count() {
      //   return this.$store.state.count
      // },

      ...mapGetters(['fullName'])
      // fullName () {
      //   return this.$store.getters.fullName
      // }
    }
  }
</script>

<style lang="stylus" scoped>
  #app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
  #cover{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity 0.2
    z-index -1
  }
</style>
