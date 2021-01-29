<template>
    <q-form @submit="submitForm">
        <q-input
        v-if="tab == 'register'"
        outlined
        v-model="formData.name"
        label="Username"
        class= "q-mb-sm"
        />
        <q-input
        outlined
        v-model="formData.email"
        type="email"
        label="Email"
        class= "q-mb-sm"
        />
        <q-input
        outlined
        v-model="formData.password"
        type="passsword"
        label="Password"
        class= "q-mb-sm"
        />
        <div class="row">
            <q-space/>
            <q-btn 
            type="submit"
            color="primary" 
            :label="tab" />
        </div>
        
    </q-form>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    props: ['tab'],
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions('store',['registerUser', 'loginUser']),
        submitForm() {
            if(this.tab==='login')
                this.loginUser(this.formData)
            else
                this.registerUser(this.formData)
        }
    }
}
</script>