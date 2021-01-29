<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        
        <!-- <q-icon name="west" /> -->
        <q-btn 
        v-go-back.single
        v-if="$route.fullPath == '/chat'"
        dense
        flat  
        icon="west" 
        label="Back"/>
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn 
        class= "absolute-right q-pr-sm"
        no-caps
        dense
        flat  
        to= "/auth"
        icon="account_circle" 
        label="Login"/>
      </q-toolbar>
    </q-header>

    

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  computed: {
    title() {
      let currentPath = this.$route.fullPath
      if(currentPath == '/') return 'SmackChat'
      else if(currentPath == '/chat') return 'Chat'
      else if(currentPath == '/user') return 'User'
      else if(currentPath == '/auth') return 'Authentication'
    }
  }
}
</script>
<style lang='sass'>

</style>
