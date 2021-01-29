<template>
  <q-page class="flex">
    <q-list separator class="full-width q-pa-md">
      <q-item
        v-for="contact in contacts"
        :key="contact.id"
        class="q-my-sm"
        clickable
        v-ripple
        to= '/chat'
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.name.charAt(0) }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge :color="contact.status == 'online' ? 'light-green-5' : 'grey'">
            {{contact.status === 'online' ? 'online' : 'offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageUser",
  data() {
    return {
      contacts: [
        {
          id: 1,
          name: "Ruddy Jedrzej",
          status: 'online'
        },
        {
          id: 2,
          name: "Mallorie Alessandrini",
          status: 'offline'
        }
      ]
    };
  }
};
</script>
