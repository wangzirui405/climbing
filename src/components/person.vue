<template>
  <div id="mainbox">
    <div id="info">
      <div class="setAvatar">
          <img v-if="user.avatar !== null && /http/.test(user.avatar)" class="avatar" :src="user.avatar">
          <img v-else-if="user.avatar !== null && !/http/.test(user.avatar)" class="avatar" :src="'http://' + user.avatar">
          <div v-else class="avatar" style="background-color: white;margin-left: 19vw;"></div>
          <input type="file" name="" @change="uploads($event)"/>
      </div>
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
      <textarea class="signature" placeholder="修改个性签名" v-model="user.description" maxlength="63" name="signature"></textarea>
    </div>
    <div class="change" @click="change" v-show="isshow">提交</div>

    <div class="modal-container" v-show="modal">
        <div class="modal" v-show="modal == 'success'">
          <div class="modal-text" v-show="true"><div class="success"></div>更新成功(｀・ω・´)</div>
          <div class="modal-button-area">
            <div class="button-small" @click="hideModal">返回</div>
          </div>
        </div>
        <div class="modal" v-show="modal == 'fail'">
          <div class="modal-text">修改失败...<br>{{ modalErrorMsg }}</div>
          <div class="modal-button-area">
            <div class="button-small" @click="hideModal">取消</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: {nickname: '', phone: '', sex: 0, description: '', avatar: null},
      userOld: {name: '', phone: '', sex: 0, description: '', avatar: null},
      sex: [
        {isChosen: false, sex: '男性', value: 1},
        {isChosen: false, sex: '女性', value: 2},
        {isChosen: true, sex: '保密', value: 0}
      ],
      isInputName: false,
      isCheckPhone: false,
      isPhoneRight: false,
      issubmit: false,
      isshow: true,
      nameunique: null,
      phoneunique: null,
      wrongmsg: {'name': '', 'phone': ''},
      modal: false,
      modalErrorMsg: ''
    }
  },
  mounted () {
    this.person()
  },
  methods: {
    hidebtn: function () {
      this.isshow = false
    },
    hideModal: function () {
      this.modal = false
      this.person()
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
    change: function () {
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
      console.log(this.user)
      if (this.user.nickname === this.userOld.name) {
        this.user.nickname = null
        this.user.name = null
      }
      if (this.user.phone === this.userOld.phone) {
        this.user.phone = null
      }
      if (this.user.description === this.userOld.description) {
        this.user.description = null
      }
      if (this.user.avatar === this.userOld.avatar) {
        this.user.avatar = null
      }
      this.$axios.post('/api/user/change/info', {
        'name': this.user.nickname,
        'phone': this.user.phone,
        'sex': this.user.sex,
        'description': this.user.description,
        'avatar': this.user.avatar
      }).then((res) => {
        // var _this = this
        console.log(res)
        if (res.data.status === 0) {
          this.modal = 'success'
        }
      }).catch((res) => {
        console.log(res)
        this.modal = 'fail'
        this.modalErrorMsg = '网络异常(｡•ˇ‸ˇ•｡)'
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
      if (this.user.nickname === this.userOld.name) {
        this.nameunique = true
        return 0
      }
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
      if (this.user.phone === this.userOld.phone) {
        this.phoneunique = true
        return 0
      }
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
    uploads: function (fileDom) {
      var _this = this
      var reader = new FileReader()
      console.log(fileDom)
      var file = fileDom.target.files[0]
      var imageType = /^image\//
      if (!imageType.test(file.type)) {
        alert('请选择正确的图片~(｀・ω・´)')
      } else {
        reader.onload = function (e) {
          _this.user.avatar = e.target.result
          console.log(_this.user.avatar)
        }
        reader.readAsDataURL(file)
      }
    },
    person () {
      this.$axios.get('/api/user')
        .then(res => {
          console.log(res.data)
          this.user = res.data
          this.user.nickname = res.data.name
          this.userOld = res.data
          for (var i = 0; i < this.sex.length; i++) {
            if (this.sex[i].value === res.data.sex) {
              this.sex_choose(i)
            }
          }
          console.log(this.userOld)
          console.log(this.user)
        })
        .catch(res => {
          console.error(res)
          alert('对不起，您未登录，请登录后再试(｡•ˇ‸ˇ•｡)')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar {
  width: 28vw;
  height: 28vw;
  border-radius: 100%;
  box-shadow: 0 0 10px 2px #bdcee0;
  position: relative;
}
.setAvatar{
  width: 66vw;
  height: 30vw;
  position: relative;
  text-align: center;
}
.setAvatar input[type=file]{
  position: absolute;
  left: 19vw;
  height: 28vw;
  width: 28vw;
  opacity: 0;
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
.change{
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
.signature {
  margin-top: 1vw;
  width: 60vw;
  height: 35vw;
  min-height: 30vh;
  font-size: 30px;
  border-radius: 10px;
  padding: 3vw;
  color: #999999;
}
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
}
.modal {
  display: inline-block;
  width: 48.5vw;
  margin: 35.3vh auto 0;
  background-color: rgba(255, 255, 255, 0.7);
  border: 4px solid #a6ddc3;
  border-radius: 1.2vw;
  font-size: 3.5vw;
}
.modal-text {
  margin-top: 7.6vw;
}
.modal-button-area {
  margin-top: 8.4vw;
  margin-bottom: 3.5vw;
}
.modal-button-area .button-small {
  margin: 0 1vw;
}
.success {
  display: inline-block;
  width: 4vw;
  height: 4vw;
  margin-right: 2vw;
  background-size: cover;
  background-image: url("/static/record/success.png");
}
.button-small {
  display: inline-block;
  width: 17.6vw;
  height: 7vw;
  border: 0.1vw solid #fff;
  border-radius: 1.2vw;
  margin: 0 3.2vw;
  font-size: 3.2vw;
  color: #fff;
  line-height: 7vw;
  background-color: #a6ddc3;
  background-size: cover;
  box-shadow: 0 0.4vw 0.8vw #99b4bc;
}
</style>
