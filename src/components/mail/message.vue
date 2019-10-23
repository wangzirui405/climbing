<template>
  <div class="main">
    <div class="title">标题：{{mailS.title}}</div>
    <div class="person">寄信人：{{mailS.from}}</div>
    <div class="person">收件人：{{mailS.to}}</div>
    <textarea class="context" v-model='mailS.context' readonly="readonly"></textarea>
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
      id: this.$route.params.id,
      user: {
      },
      mailsG: [
      ],
      mailsP: [
      ],
      mailS: {'id': null, 'title': '……', 'from': '……', 'to': '……', 'context': '……'}
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
        console.log(this.id)
        for (var j = 0; j < this.mailsG.length; j++) {
          console.log('ok')
          console.log(this.mailsG[j].id)
          if (this.mailsG[j].id === parseInt(this.id)) {
            this.mailS = this.mailsG[j]
            console.log(this.mailS)
          }
        }
      }).catch(res => {
        console.log(res)
      })
    },
    getMailsP: function () {
      this.$axios.get('/api/mail/list/send').then(res => {
        console.log(res.data)
        this.mailsP = res.data
        for (var i = 0; i < this.mailsP.length; i++) {
          this.mailsP[i].avatar = null
        }
        console.log(this.mailsP)
        console.log(this.id)
        for (var j = 0; j < this.mailsP.length; j++) {
          console.log('ok')
          console.log(this.mailsP[j].id)
          if (this.mailsP[j].id === parseInt(this.id)) {
            this.mailS = this.mailsP[j]
            console.log(this.mailS)
          }
        }
      }).catch(res => {
        console.log(res)
      })
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
.title{
  margin-top: 10vw;
  width: 80vw;
  height: 8vw;
  font-size: 5vw;
  border-bottom: 0.8vw solid black;
}
.person{
  width: 80vw;
  height: 8vw;
  font-size: 5vw;
  border-bottom: 0.5vw solid black;
}
.context{
  width: 80vw;
  min-height: 60vw;
  font-size: 6vw;
  text-decoration: underline;
  line-height: 10vw;
}
</style>
