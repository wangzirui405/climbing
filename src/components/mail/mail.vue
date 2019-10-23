<template>
  <div class="main">
    <div class="user">
      <div class="avatarbackground">
        <img v-if="user.avatar !== null && /http/.test(user.avatar)" class="imgset" :src="user.avatar">
        <img v-else-if="user.avatar !== null && !/http/.test(user.avatar)" class="imgset" :src="'http://' + user.avatar">
        <div v-else class="imgset" style="background-color: white;margin-left: 19vw;"></div>
      </div>
      <div style="width: 96vw;text-align:center;margin-top:4vw;vertical-align: middle;">
        <div class="nick">{{user.name||"神秘人"}}</div>
        <div class="sex">
          <img v-if="user.sex==1" class="imgset1" src="../../../static/user/male.png">
          <img v-else-if="user.sex==2" class="imgset2" src="../../../static/user/female.png">
          <img v-else-if="user.sex==0" class="imgset" src="">
        </div>
      </div>
    </div>
    <div class="selectBox">
      <div id="id1" @click="toggleBox" :class="{buttonSlected:box_1,buttonUnselected:!box_1}">收件箱</div>
      <div id="id2" @click="toggleBox" :class="{buttonSlected:box_2,buttonUnselected:!box_2}">发件箱</div>
    </div>
    <div class="mailList">
      <div style="width: 80vw;height: 3vw;background: none;"></div>
      <div v-show="box_1" v-for="(item,index) in mailsG" :key="'G' + index" class="mails">
        <div class="mailImgBackground">
          <img v-if="item.avatar_from !== null && /http/.test(item.avatar_from)" class="imgset" :src="item.avatar_from">
          <img v-else-if="item.avatar_from !== null && !/http/.test(item.avatar_from)" class="imgset" :src="'http://' + item.avatar_from">
          <div v-else class="imgset" style="background-color: white;margin-left: 19vw;"></div>
        </div>
        <div class="mailTitle" @click='showMail(item.id)'>{{item.title}}
          <br>
          <span class="time">{{item.created_at}}</span>
        </div>
        <img class="cancel" src="/static/user/icon_false.png" @click="deleteMail(item.id)" />
      </div>
      <div v-show="box_2" v-for="(item,index) in mailsP" :key="'P' + index" class="mails">
        <div class="mailImgBackground">
          <img v-if="item.avatar_to !== null && /http/.test(item.avatar_to)" class="imgset" :src="item.avatar_to">
          <img v-else-if="item.avatar_to !== null && !/http/.test(item.avatar_to)" class="imgset" :src="'http://' + item.avatar_to">
          <div v-else class="imgset" style="background-color: white;margin-left: 19vw;"></div>
        </div>
        <div class="mailTitle" @click='showMail(item.id)'>{{item.title}}
          <br>
          <span class="time">{{item.created_at}}</span>
        </div>
        <img class="cancel" src="/static/user/icon_false.png" @click="deleteMail(item.id)" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  computed: {
  },
  data () {
    return {
      user: {
      },
      box_1: true,
      box_2: false,
      mailsG: [
      ],
      mailsP: [
      ]
    }
  },
  methods: {
    getMailsG: function () {
      this.$axios.get('/api/mail/list/receive').then(res => {
        console.log(res.data)
        this.mailsG = res.data
        for (var i = 0; i < this.mailsG.length; i++) {
          this.mailsG[i].avatar = null
        }
        console.log(this.mailsG)
      }).catch(res => {
        console.log(res)
      })
    },
    showMail: function (id) {
      this.$router.push('/message/' + id)
    },
    getMailsP: function () {
      this.$axios.get('/api/mail/list/send').then(res => {
        console.log(res.data)
        this.mailsP = res.data
        for (var i = 0; i < this.mailsP.length; i++) {
          this.mailsP[i].avatar = null
        }
        console.log(this.mailsP)
      }).catch(res => {
        console.log(res)
      })
    },
    deleteMail: function (id) {
      var sure = confirm('确定要删除嘛(｡•ˇ‸ˇ•｡)')
      if (!sure) {
        return 0
      }
      var _this = this
      this.$axios.post('/api/mail/remove/' + id, {
      }).then((res) => {
        // var _this = this
        console.log(res)
        if (res.data.status === 0) {
          alert('删除成功~(｀・ω・´)')
        }
        _this.getMailsP()
        _this.getMailsG()
      }).catch((res) => {
        console.log(res)
        alert('对不起，目前与服务器的链接不正常，请稍后再试(｡•ˇ‸ˇ•｡)')
      })
    },
    toggleBox: function (event) {
      var select = event.currentTarget.id
      switch (select) {
        case 'id1':
          this.box_1 = true
          this.box_2 = false
          break
        case 'id2':
          this.box_1 = false
          this.box_2 = true
          break
        default:
          break
      }
    }
  },
  mounted () {
    this.$axios.get('/api/user').then(res => {
      console.log(res.data)
      this.user = res.data
      console.log(this.user)
    }).catch(res => {
      console.log(res)
    })
    this.getMailsP()
    this.getMailsG()
  }
}
</script>

<style scoped>
.main {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
}
.user {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4vw;
}
.avatarbackground{
  width: 32vw;
  height: 32vw;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 0px 0px 50px 1px #838383;
}
.selectBox {
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
  margin-top: 8vh;
}
.buttonUnselected {
  text-align: center;
  vertical-align: middle;
  line-height: 10vw;
  width: 35vw;
  height: 10vw;
  background-color: white;
  border-radius: 4vw;
  font-size: 30px;
  box-shadow: 5px 5px 25px #E9E9E9;
}
.buttonSlected {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  background-color: #c1e8d5;
  width: 35vw;
  height: 10vw;
  border-radius: 4vw;
  font-size: 30px;
}
.imgset{
  max-width:100%;
  height: 100%;
  margin: 0 auto;
  display: block;
}
.imgset1{
  max-width:100%;
  height: 100%;
  margin: 0 auto;
  display: block;
}
.imgset2{
  max-width:120%;
  height: 120%;
  margin: 0 auto;
  display: block;
}
.sex{
  width: 5vw;
  height: 5vw;
  background-color: white;
  display: inline-block;
  vertical-align: middle;
}
.nick{
  font-size:30px;
  color:black;
  text-align: center;
  display: inline-block;
  padding-left: 1vw;
  padding-right: 1vw;
  vertical-align: middle;
}
.mailList{
  height: 50vh;
  overflow-y: auto;
}
.mails{
  width: 100%;
  height: 20vw;
  margin-top: 8vw;
  padding-bottom: 1vw;
}
.mailImgBackground{
  width: 20vw;
  height: 20vw;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 0px 0px 50px 1px #838383;
  margin-left: 5vw;
  display: inline-block;
}
.mailTitle{
  height: 20vw;
  width: 50vw;
  margin-left: 5vw;
  position: relative;
  font-size: 24px;
  vertical-align: top;
  display: inline-block;
}
.cancel{
  position: relative;
  display: inline-block;
  float: right;
  vertical-align: middle;
  height: 28px;
  width: 28px;
  padding-right: 7px;
}
.time{
  font-size: 10px;
}
</style>
