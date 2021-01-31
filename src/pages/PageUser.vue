<template>
  <q-page class="flex">
    <q-list separator class="full-width q-pa-md">
      <q-item
        v-for="(user, key) in users"
        :key="key"
        class="q-my-sm"
        clickable
        v-ripple
        :to= "'/chat/' + key"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey'">
            {{user.online ? 'online' : 'offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "PageUser",
  computed: {
    ...mapGetters('store', ['users'])
  }
};
</script>
