<template>
  <q-page class="flex column">
    <q-banner inline-actions class="text-center text-black bg-grey">
      User is Offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.sender"
        :text="[message.text]"
        :sent= "message.sender === 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form
        class="full-width" 
        @submit="sendMessage" >
          <q-input
            
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
export default {
  name: "PageIndex",
  data() {
    return {
      newMessage: "",
      messages: [{
        text: 'hi..',
        sender: 'james'
      }],
    };
  },
  methods: {
    sendMessage: function() {
      this.messages.push({
        text: this.newMessage,
        sender: 'me'
      })
    }
  }
};
</script>
