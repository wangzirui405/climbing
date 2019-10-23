<template>
  <div id="mainbox">
    <div id="info">
      <div id="oldPassword">
        <div :class="{'infostyle':!isCheckOldPassword,'isright':isCheckOldPassword&&isHaveOldPassword,'iswrong':isCheckOldPassword&&!isHaveOldPassword}">
          <label for="oldPasswordinput" class="word1">旧密码</label>
          <span>
            <img class="alertimg" src="/static/user/icon_true.png" v-show="isCheckOldPassword&&isHaveOldPassword" />
          </span>
        </div>
        <div class="inputBox">
          <input id="oldPasswordinput" type="password" class="infoinput" v-model="user.oldPassword" @focus="hidebtn" @blur="checkOldPassword" placeholder="填写密码" maxlength="20">
        </div>
      </div>
      <hr />
      <div class="alertBox" v-show="isCheckOldPassword&&!isHaveOldPassword">
        <span><img class="alertimg" src="/static/user/icon_false.png" /></span>
        <span :class="{'isright':isCheckOldPassword&&isHaveOldPassword,'iswrong':isCheckOldPassword&&!isHaveOldPassword,'word2':'ture'}">{{wrongmsg.oldPassword}}</span>
      </div>
      <div id="password">
        <div :class="{'infostyle':!isCheckPassword,'isright':isCheckPassword&&isHavePassword,'iswrong':isCheckPassword&&!isHavePassword}">
          <label for="passwordinput" class="word1">新密码</label>
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
    <div class="changePassword" @click="changePassword" v-show="isshow">修改</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: {oldPassword: '', password: ''},
      isCheckOldPassword: false,
      isHaveOldPassword: false,
      isCheckPassword: false,
      isHavePassword: false,
      issubmit: false,
      isshow: true,
      wrongmsg: {'oldPassword': '', 'password': ''},
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
    changePassword: function () {
      if (this.issubmit === true) {
        console.log('disable')
        return
      }
      this.issubmit = true
      console.log(this.user)
      if (this.user.oldPassword.length === 0) {
        this.isCheckOldPassword = true
        this.isHaveOldPassword = false
        this.wrongmsg.oldPassword = '请填写旧密码~(｀・ω・´)'
        return 0
      }
      if (this.user.password.length === 0) {
        this.isCheckPassword = true
        this.isHavePassword = false
        this.wrongmsg.password = '请填写新密码~(｀・ω・´)'
        return 0
      }
      console.log(this.user)
      this.$axios.post('/api/user/change/pwd', {
        'password': this.user.oldPassword,
        'new_password': this.user.password
      }).then((res) => {
        // var _this = this
        console.log(res)
        if (res.data.status === 0) {
          alert('修改成功~(｀・ω・´)')
        }
        if (res.data.status === 2) {
          alert('原密码错误~(｀・ω・´)')
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
        this.wrongmsg.password = '请填写新密码~(｀・ω・´)'
        return 0
      } else {
        this.isCheckPassword = true
        this.isHavePassword = true
      }
      console.log(this.user.password)
    },
    checkOldPassword: function () {
      this.isshow = true
      if (this.user.oldPassword.length === 0) {
        this.isCheckOldPassword = true
        this.isHaveOldPassword = false
        this.wrongmsg.oldPassword = '请填写旧密码~(｀・ω・´)'
        return 0
      } else {
        this.isCheckOldPassword = true
        this.isHaveOldPassword = true
      }
      console.log(this.user.oldPassword)
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
#oldPassword, #phone, #school{
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
.changePassword{
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
