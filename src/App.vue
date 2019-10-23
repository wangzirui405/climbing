<template>
  <div id='app'>
    <div style="height: 5vw;width: 100vw;"></div>
    <div>
      <router-link v-for='(item,index) in link' :key='index' class='link' tag='div' :to='item.to' replace>{{item.name}}</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      link: [
        {
          to: '/', name: '注册'
        },
        {
          to: '/person', name: '个人信息'
        },
        {
          to: '/signIn', name: '登录'
        },
        {
          to: '/password', name: '密码'
        },
        {
          to: '/mail', name: '邮箱'
        },
        {
          to: '/friends', name: '好友列表'
        }
      ]
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
}
.link{
  display: inline;
  margin-left: 1vw;
}
.active{
  background-color: powderblue;
  color: white;
  padding: 10px;
  box-shadow: 5px;
}
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
