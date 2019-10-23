<template>
  <div id="mainBox">
    <div id="info">
      <div id="name">
        <div :class="{'infostyle':!isInputName,'isright':isInputName&&nameunique,'iswrong':isInputName&&!nameunique}">
          <label for="nameinput" class="word1">昵称</label>
          <span>
            <img class="alertimg" src="/static/user/icon_true.png" v-show="isInputName&&nameunique" />
          </span>
        </div>
        <div class="inputBox">
          <input id="nameinput" class="infoinput" v-model="user.nickname" @focus="hidebtn" @blur="checkname" placeholder="请填写昵称">
        </div>
      </div>
      <hr />
      <div class="alertBox" v-show="isInputName&&!nameunique">
        <span><img class="alertimg" src="/static/user/icon_false.png" /></span>
        <span :class="{'isright':isInputName&&nameunique,'iswrong':isInputName&&!nameunique,'word2':'ture'}">{{wrongmsg.name}}</span>
      </div>
      <div id="phone">
        <div :class="{'infostyle':!isCheckPhone,'isright':isCheckPhone&&isPhoneRight,'iswrong':isCheckPhone&&!isPhoneRight}">
          <label for="phoneinput" class="word1">电话号码</label>
          <span>
            <img class="alertimg" src="/static/user/icon_true.png" v-show="isCheckPhone&&isPhoneRight" />
          </span>
        </div>
        <div class="inputBox">
          <input id="phoneinput" type="number" class="infoinput" v-model="user.phone" @focus="hidebtn" @blur="checkphone" placeholder="填写手机长号" maxlength="11">
        </div>
      </div>
      <hr />
      <div class="alertBox" v-show="isCheckPhone&&!isPhoneRight">
        <span><img class="alertimg" src="/static/user/icon_false.png" /></span>
        <span :class="{'isright':isCheckPhone&&isPhoneRight,'iswrong':isCheckPhone&&!isPhoneRight&&!phoneunique,'word2':'ture'}">{{wrongmsg.phone}}</span>
      </div>
      <div id="sex">
        <div v-for="(item,index) in sex" :key="index" :id="index" ref="dataInfo" class="sexChoose" @click="sex_choose(index)">
          <span id="chosenicon" class="chosenicon">
            <img src="/static/user/icon_true.png" v-show="item.isChosen" />
            <img src="/static/user/signin_icon_select_nor.png" v-show="!item.isChosen" />
          </span>
          <span class="word1">{{item.sex}}</span>
        </div>
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
    <div class="signup" @click="sign_up" v-show="isshow">注册</div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: {nickname: '', phone: '', sex: 0, password: ''},
      sex: [
        {isChosen: false, sex: '男性', value: 1},
        {isChosen: false, sex: '女性', value: 2},
        {isChosen: true, sex: '保密', value: 0}
      ],
      isInputName: false,
      isCheckPhone: false,
      isCheckPassword: false,
      isPhoneRight: false,
      isHavePassword: false,
      issubmit: false,
      isshow: true,
      nameunique: null,
      phoneunique: null,
      wrongmsg: {'name': '', 'phone': '', 'password': ''},
      signedup: false
    }
  },
  mounted () {
    this.exit()
  },
  methods: {
    hidebtn: function () {
      this.isshow = false
    },
    sex_choose: function (id) {
      console.log(id)
      for (var i = 0; i < this.sex.length; i++) {
        this.sex[i].isChosen = false
      }
      this.sex[id].isChosen = true
      this.user.sex = this.sex[id].value
      console.log(this.user.sex)
    },
    sign_up: function () {
      if (this.issubmit === true) {
        console.log('disable')
        return
      }

      this.issubmit = true
      console.log('ok')
      if (this.user.nickname.length === 0) {
        this.isInputName = true
        this.wrongmsg.name = '请正确填写昵称~(｀・ω・´)'
        this.issubmit = false
        return 0
      }
      if (this.nameunique === false) {
        this.isInputName = true
        this.wrongmsg.name = '你的昵称已经被别人用了哦~(｀・ω・´)'
        this.issubmit = false
        return 0
      }
      if (!/^1\d{10}$/.test(this.user.phone)) {
        this.isCheckPhone = true
        this.isPhoneRight = false
        this.wrongmsg.phone = '请正确填写手机号码~(｀・ω・´)'
        this.issubmit = false
        return 0
      }
      if (this.phoneunique === false) {
        this.isCheckPhone = true
        this.wrongmsg.name = '你的电话已经被别人用了哦~(｀・ω・´)'
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
      this.$axios.post('/register', {
        'name': this.user.nickname,
        'phone': this.user.phone,
        'sex': this.user.sex,
        'password': this.user.password
      }).then((res) => {
        // var _this = this
        console.log(res)
        if (res.data.status === 0) {
          alert('注册成功~(｀・ω・´)')
        }
      }).catch((res) => {
        console.log(res)
        alert('对不起，目前与服务器的链接不正常，请稍后再试(｡•ˇ‸ˇ•｡)')
        var _this = this
        _this.issubmit = false
      })
    },
    checkname: function () {
      this.isshow = true
      if (this.user.nickname.length === 0) {
        this.isInputName = true
        this.nameunique = false
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
          if (!parseInt(res.data.status)) {
            _this.nameunique = true
          } else {
            _this.nameunique = false
            _this.wrongmsg.name = '你的昵称已经被别人用了哦~(｀・ω・´)'
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    checkphone: function () {
      this.isshow = true
      if (!/^1\d{10}$/.test(this.user.phone)) {
        this.isCheckPhone = true
        this.isPhoneRight = false
        this.phoneunique = false
        this.wrongmsg.phone = '请正确填写手机号码~(｀・ω・´)'
        return 0
      } else {
        this.isCheckPhone = true
        this.isPhoneRight = true
      }
      console.log(this.user.phone)
      this.$axios.get('/check/phone/' + this.user.phone, {
      })
        .then((res) => {
          console.log(res)
          console.log(res.data.status)
          var _this = this
          if (!parseInt(res.data.status)) {
            _this.phoneunique = true
          } else {
            _this.phoneunique = false
            _this.isPhoneRight = false
            _this.wrongmsg.phone = '你的电话已经被注册过了哦~(｀・ω・´)'
          }
        })
        .catch(res => {
          console.log(res)
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
    exit () {
      $('.hello').hide()
      this.$axios.get('/api/user')
        .then(res => {
          console.log(res.msg)
        })
        .catch(res => {
          console.error(res)
        })
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
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
.signup{
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
