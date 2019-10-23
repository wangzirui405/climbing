<template>
  <div id="mainbox">
    <div id="info">
      <div id="name">
        <div :class="{'infostyle':!isInputName,'isright':isInputName&&!nameunique,'iswrong':isInputName&&nameunique}">
          <label for="nameinput" class="word1">昵称</label>
          <span>
            <img class="alertimg" src="/static/user/icon_true.png" v-show="isInputName&&!nameunique" />
          </span>
        </div>
        <div class="inputBox">
          <input id="nameinput" class="infoinput" v-model="user.nickname" @focus="hidebtn" @blur="checkname" placeholder="请填写昵称">
        </div>
      </div>
      <hr />
        <div class="alertBox" v-show="isInputName&&nameunique">
        <span><img class="alertimg" src="/static/user/icon_false.png" /></span>
        <span :class="{'isright':isInputName&&!nameunique,'iswrong':isInputName&&nameunique,'word2':'ture'}">{{wrongmsg.name}}</span>
      </div>
      <div id="password">
        <div :class="{'infostyle':!isCheckPassword,'isright':isCheckPassword&&isHavePassword,'iswrong':isCheckPassword&&!isHavePassword}">
          <label for="passwordinput" class="word1">密码</label>
          <span>
            <img class="alertimg" src="/static/user/icon_true.png" v-show="isCheckPassword&&isHavePassword" />
          </span>
        </div>
        <div class="inputBox">
          <input id="passwordinput" type="password" class="infoinput" v-model="user.password" @focus="hidebtn" @blur="checkpassword" placeholder="填写密码" maxlength="20">
        </div>
      </div>
      <hr />
      <div class="alertBox" v-show="isCheckPassword&&!isHavePassword">
        <span><img class="alertimg" src="/static/user/icon_false.png" /></span>
        <span :class="{'isright':isCheckPassword&&isHavePassword,'iswrong':isCheckPassword&&!isHavePassword,'word2':'ture'}">{{wrongmsg.password}}</span>
      </div>
    </div>
    <div class="signIn" @click="signIn" v-show="isshow">登录</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: {nickname: '', password: ''},
      isInputName: false,
      isCheckPassword: false,
      isHavePassword: false,
      issubmit: false,
      isshow: true,
      nameunique: true,
      wrongmsg: {'name': '', 'password': ''},
      signedIn: false
    }
  },
  mounted () {
    this.person()
    if (this.signedIn === true) {
      this.exit()
      this.signedIn = false
    }
  },
  methods: {
    person () {
      this.$axios.get('/api/user')
        .then(res => {
          console.log(res.data.msg)
          if (res.data.status !== '401') {
            this.signedIn = true
          }
        })
        .catch(res => {
          console.error(res)
        })
    },
    exit: function () {
      this.$axios.get('/auth/logout')
        .then(res => {
          console.log(res.data.msg)
          if (res.data.status === 0) {
            alert('退出成功~(｀・ω・´)')
          }
        })
        .catch(res => {
          console.error(res)
        })
    },
    hidebtn: function () {
      this.isshow = false
    },
    signIn: function () {
      if (this.issubmit === true) {
        console.log('disable')
        return
      }
      this.issubmit = true
      console.log(this.user)
      if (this.user.nickname.length === 0) {
        this.isInputName = true
        this.wrongmsg.name = '请正确填写昵称~(｀・ω・´)'
        this.issubmit = false
        console.log('ok')
        return 0
      }
      if (this.nameunique === true) {
        this.isInputName = true
        this.wrongmsg.name = '用户名不存在~(｀・ω・´)'
        this.issubmit = false
        return 0
      }
      if (this.user.password.length === 0) {
        this.isCheckPassword = true
        this.isHavePassword = false
        this.wrongmsg.password = '请填写密码~(｀・ω・´)'
        return 0
      }
      console.log(this.user)
      this.$axios.post('/auth/login', {
        'account': this.user.nickname,
        'password': this.user.password
      }).then((res) => {
        // var _this = this
        console.log(res)
        if (res.data.status === 0) {
          alert('登录成功~(｀・ω・´)')
        }
        if (res.data.status === 3) {
          alert('密码错误~(｀・ω・´)')
        }
      }).catch((res) => {
        console.log(res)
        alert('对不起，目前与服务器的链接不正常，请稍后再试(｡•ˇ‸ˇ•｡)')
        var _this = this
        _this.issubmit = false
      })
    },
    checkpassword: function () {
      this.isshow = true
      if (this.user.password.length === 0) {
        this.isCheckPassword = true
        this.isHavePassword = false
        this.wrongmsg.password = '请填写密码~(｀・ω・´)'
        return 0
      } else {
        this.isCheckPassword = true
        this.isHavePassword = true
      }
      console.log(this.user.password)
    },
    checkname: function () {
      this.isshow = true
      if (this.user.nickname.length === 0) {
        this.isInputName = true
        this.nameunique = true
        this.wrongmsg.name = '请正确填写昵称~(｀・ω・´)'
        return 0
      }
      this.isInputName = true
      console.log(this.user.nickname)
      this.$axios.get('/check/name/' + this.user.nickname, {
      })
        .then((res) => {
          console.log(res)
          console.log(res.data.status)
          var _this = this
          if (parseInt(res.data.status) === 0) {
            _this.nameunique = true
            _this.wrongmsg.name = '用户名不存在~(｀・ω・´)'
          } else {
            _this.nameunique = false
          }
        })
        .catch(res => {
          console.log(res)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainBox{
  width: 100vw;
  height: 100%;
  min-height: 600px;
  left: 0px;
  top: 0px;
  /*padding: 5% 4%;*/
  position: relative;
  background-size: 100% 100%;
}
#sex{
  width: 80%;
  margin: 1vw 1vw 1vw 0.2vw;
  font-size: 26px;
  margin-top: 4.444vw;
}
.chosenicon{
  width: 24px;
  margin-right: 8px;
}
#info{
  width: 66vw;
  margin: 0 17vw;
  position: relative;
  top: 10.5vw;
}
#name, #phone, #school{
  width: 100%;
  height: 48px;
  position: relative;
  margin-top: 3.5556vw;
  /*margin: 20px 20px 0 20px;*/
}
.infostyle, .isright, .iswrong{
  float: left;
  font-size: 30px;
  margin: 16px 8px 0px 8px;
}
.alertBox{
  width: 70vw;
  height: 25px;
  line-height: 26px;
  text-align: left;
  font-size: 24px;
  margin-top: 1.778vw;
  color: rgb(219,77,109);
}
.alertimg{
  position: relative;
  float: left;
  bottom: -3px;
  height: 28px;
  width: 28px;
  padding-right: 7px;
}
.infostyle{
  color: rgb(153,168,164);
}
.isright{
  color: rgb(129,204,0);
}
.iswrong{
  color: rgb(219,77,109);
}
.infoinput{
  width: 95%;
  outline: none;
  border-style: none;
  color: rgb(51,51,51);
  font-size: 28px;
  text-align: right;
  margin: 0 0.8889vw;
}
.inputBox{
  width: 80%;
  position: relative;
  float: right;
  margin-top: 16px;
  margin-bottom: 5px;
}
.signIn{
  width: 40vw;
  height: 15.11vw;
  margin: 0 auto;
  background:none;
  position: relative;
  top: 40vw;
  font-size: 2em;
}
hr{
  margin-top: 0;
  /*margin-bottom: 32px; */
  width: 100%;
  border: none;
  border-top:2px solid;
  border-color: rgb(204,204,204);
}
.word1{
  /*为了解决图片和文字对其的问题*/
  position: relative;
  bottom: 4px;
  margin: 0;
  color:rgb(50, 53, 52);
}
 .word2{
  position: relative;
  font-size: 24px;
  bottom: -3px;
  margin: 0;
}
</style>
