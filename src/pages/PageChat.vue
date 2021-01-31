<template>
  <q-page 
  ref="pageChat"
  class="page-chat flex column">
    <q-banner v-if="!otherUserDetails.online" inline-actions class="fixed-top text-center text-black bg-grey">
      {{ otherUserDetails.name }} is Offline
    </q-banner>
    <div 
    :class = "{'invisible' : !showMessages}"
    class=" q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from === 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent= "message.from === 'me' ? true : false"
        :bg-color="message.from === 'me' ? 'white' : 'light-green-2'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form
        class="full-width" 
        @submit="sendMessage" >
          <q-input
          ref="newMessage"
            outlined
            bg-color="white"
            rounded
            v-model="newMessage"
            label="Message"
            dense
            
          >
            <template v-slot:after>
              <q-btn type= "submit" @click= "sendMessage" color="white" round dense flat icon="send" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from '../mixins/mixin-other-user-detail.js'
export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: "",
      showMessages: false
    };
  },
  methods: {
    ...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseAddMessages']),
    sendMessage: function() {
      this.firebaseAddMessages({
        message: {
          from: 'me',
        text: this.newMessage
        },
        otherUserId: this.$route.params.otherUserId
      })
      this.clearMessage()
    },
    clearMessage() {
      this.newMessage = ''
      this.$refs.newMessage.focus()
    },
    scrollToBottom() {
      let chatPage = this.$refs.pageChat.$el
      setTimeout(()=>{
        window.scrollTo(0, chatPage.scrollHeight)
      },20)
      
    }
  },
  watch: {
    messages: function(val) {
      console.log('gite')
      if(Object.keys(val).length){
        this.scrollToBottom()
        setTimeout(() => {
          this.showMessages = true
        },200)
      }
    }
  },
  computed: {
    ...mapState('store', ['messages', 'userDetails'])
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId)
  },
  destroyed() {
    this.firebaseStopGettingMessages()
  }
};
</script>

<style lang="stylus">
  .page-chat
    background #e2dfd5
    &:after
      content ''
      display block
      position fixed
      top 0
      right 0
      left 0
      bottom 0
      z-index 0
      opacity 0.2
      background-image  linear-gradient(135deg, #b8b9d3 25%, transparent 25%), linear-gradient(225deg, #b8b9d3 25%, transparent 25%), linear-gradient(45deg, #b8b9d3 25%, transparent 25%), linear-gradient(315deg, #b8b9d3 25%, #E5E5F7 25%)
      background-position  20px 0, 20px 0, 0 0, 0 0
      background-size 40px 40px
      background-repeat repeat
    .q-message
      z-index 1
    .q-banner
      top 50px
      z-index 2
      opacity 0.8
</style>