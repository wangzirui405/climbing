<template>
  <div id="mainbox">
    <div class="setAvatar">
      <div class="avatar" style="background: url(/static/user/add.png) no-repeat;background-size: contain;margin-left: 4vw;" @click="show"></div>
    </div>
    <div v-for="(item,index) in friends" :key="index" :id="'friend' + index">
      <div class="setAvatar">
        <img v-if="item.avatar !== null && /http/.test(item.avatar)" class="avatar" :src="item.avatar" @click="toOther(item.id)">
        <img v-else-if="item.avatar !== null && !/http/.test(item.avatar)" class="avatar" :src="'http://' + item.avatar" @click="toOther(item.id)">
        <div v-else class="avatar" style="background-color: white;" @click="toOther(item.id)"></div>
        <div class="word1">{{item.name}}</div>
      </div>
      <span><img class="alertimg cancel" src="/static/user/icon_false.png" @click="deleteFriend(item.name)" /></span>
    </div>

    <div class="modal-container" v-show="add">
      <div class="modal" v-show="add">
        <div id="name">
          <div :class="{'infostyle':!isInputName,'isright':isInputName&&!nameunique,'iswrong':isInputName&&nameunique}">
            <label for="nameinput" class="word2">昵称</label>
            <span>
              <img class="alertimg" src="/static/user/icon_true.png" v-show="isInputName&&!nameunique" />
            </span>
          </div>
          <div class="inputBox">
            <input id="nameinput" class="infoinput" v-model="inputName" @focus="hidebtn" @blur="checkname" placeholder="请填写昵称">
          </div>
        </div>
        <hr />
          <div class="alertBox" v-show="isInputName&&nameunique">
          <span><img class="alertimg" src="/static/user/icon_false.png" /></span>
          <span :class="{'isright':isInputName&&!nameunique,'iswrong':isInputName&&nameunique,'word2':'ture'}">{{wrongmsg.name}}</span>
        </div>
        <div class="modal-button-area" v-show="isshow">
          <div class="button-small" @click="addFriend">确定</div>
          <div class="button-small" @click="hideModal">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      friends: [
      ],
      user: {
      },
      add: false,
      inputName: '',
      isInputName: false,
      isshow: true,
      nameunique: true,
      wrongmsg: {'name': ''},
      issubmit: false
    }
  },
  mounted () {
    this.person()
    this.friend()
  },
  methods: {
    person () {
      this.$axios.get('/api/user')
        .then(res => {
          console.log(res.data)
          this.user = res.data
          this.user.nickname = res.data.name
        })
        .catch(res => {
          console.error(res)
          alert('对不起，您未登录，请登录后再试(｡•ˇ‸ˇ•｡)')
        })
    },
    hidebtn: function () {
      this.isshow = false
    },
    deleteFriend: function (name) {
      var sure = confirm('确定要删除嘛(｡•ˇ‸ˇ•｡)')
      if (!sure) {
        return 0
      }
      var _this = this
      this.$axios.post('/api/friend/remove', {
        'friend_name': name
      }).then((res) => {
        // var _this = this
        console.log(res)
        if (res.data.status === 0) {
          alert('删除成功~(｀・ω・´)')
        }
        _this.friend()
      }).catch((res) => {
        console.log(res)
        alert('对不起，目前与服务器的链接不正常，请稍后再试(｡•ˇ‸ˇ•｡)')
      })
    },
    hideModal: function () {
      this.add = false
      this.friend()
    },
    show: function () {
      this.add = true
    },
    addFriend: function () {
      if (this.issubmit === true) {
        console.log('disable')
        return
      }
      this.issubmit = true
      if (this.inputName.length === 0) {
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
      if (this.inputName === this.user.name) {
        this.isInputName = true
        this.nameunique = true
        this.wrongmsg.name = '不能加自己哟~(｀・ω・´)'
        this.issubmit = false
        return 0
      }
      this.$axios.post('/api/friend/add', {
        'friend_name': this.inputName
      }).then((res) => {
        // var _this = this
        console.log(res)
        if (res.data.status === 0) {
          alert('添加成功~(｀・ω・´)')
        }
        if (res.data.status === 2) {
          alert('你已经有这个好友啦~(｀・ω・´)')
        }
      }).catch((res) => {
        console.log(res)
        alert('对不起，目前与服务器的链接不正常，请稍后再试(｡•ˇ‸ˇ•｡)')
        var _this = this
        _this.issubmit = false
      })
    },
    toOther: function (id) {
      this.$router.push('/other/' + id)
    },
    checkname: function () {
      this.isshow = true
      if (this.inputName.length === 0) {
        this.isInputName = true
        this.nameunique = true
        this.wrongmsg.name = '请正确填写昵称~(｀・ω・´)'
        return 0
      }
      if (this.inputName === this.user.name) {
        this.isInputName = true
        this.nameunique = true
        this.wrongmsg.name = '不能加自己哟~(｀・ω・´)'
        this.issubmit = false
        return 0
      }
      this.isInputName = true
      this.$axios.get('/check/name/' + this.inputName, {
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
    },
    friend: function () {
      this.$axios.get('/api/friend/list', {
      }).then((res) => {
        console.log(res)
        this.friends = res.data
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cancel{
  margin-left: 25vw;
  margin-top: -10vw;
}
.avatar {
  width: 15vw;
  height: 15vw;
  position: relative;
}
.setAvatar{
  width: 25vw;
  height: 15vw;
  position: relative;
  margin-top: 9vw;
}
#mainBox{
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  min-height: 600px;
  left: 0px;
  top: 0px;
  /*padding: 5% 4%;*/
  position: relative;
  background-size: 100% 100%;
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
  width: 80vw;
  margin: 35.3vh auto 0;
  background-color: white;
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
.word2{
  position: relative;
  font-size: 24px;
  bottom: -3px;
  margin: 0;
}
.word1{
  position: relative;
  font-size: 1vw;
}
</style>
