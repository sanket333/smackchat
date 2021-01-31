<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        
        <q-btn 
        v-go-back.single
        class = "absolute-left"
        v-if="$route.fullPath.includes('/chat')"
        dense
        flat  
        icon="west" 
        label="Back"/>
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn 
        v-if="!userDetails.name"
        class= "absolute-right q-pr-sm"
        no-caps
        dense
        flat  
        icon="account_circle" 
        
        >
        Login
        </q-btn>
        <q-btn 
        v-else
        class= "absolute-right q-pr-sm"
        no-caps
        dense
        flat  
        icon="account_circle" 
        @click="userLogOut"
        >
        Logout<br>{{ userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from '../mixins/mixin-other-user-detail.js'

export default {
  
  mixins: [mixinOtherUserDetails],
  data () {
    return {
    }
  },
  computed: {
    ...mapState('store',['userDetails']),
    title() {
      let currentPath = this.$route.fullPath
      if(currentPath == '/') return 'SmackChat'
      else if(currentPath.includes('/chat')) return this.otherUserDetails.name
      else if(currentPath == '/user') return 'User'
      else if(currentPath == '/auth') return 'Authentication'
    }
  },
  methods: {
    ...mapActions('store', ['userLogOut']),
  }
}
</script>
<style lang='stylus'>
  .q-btn__wrapper
    .q-btn__content
      line-height 15px
</style>
