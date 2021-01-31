import Vue from "vue";
import { firebaseAuth, firebaseDb } from 'boot/firebase'

let messageRef;

const state = {
    userDetails: {},
    users: {},
    messages: {}
}
const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
    },
    addUser(state, payload) {
        Vue.set(state.users, payload.userId, payload.userDetails)
    },
    updateUser(state, payload) {
        Object.assign(state.users[payload.userId], payload.userDetails)
    },
    getMessages(state, payload) {
        Vue.set(state.messages, payload.messageId, payload.messageDetails)
    },
    clearMessages(state) {
        state.messages = {}
    }
}
const actions = {
    registerUser({}, payload) {
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            let userId = firebaseAuth.currentUser.uid
            firebaseDb.ref('users/'+userId).set({
                name: payload.name,
                email: payload.email,
                online: true
            })
        })
        .catch(error => console.log(error.message))
    },
    loginUser({}, payload) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .catch(error => console.log(error.message))
    },
    handleAuthStateChange({ commit, dispatch, state }) {
        firebaseAuth.onAuthStateChanged(user => {
            if(user){
                let userId = firebaseAuth.currentUser.uid
                firebaseDb.ref('users/'+userId).once('value', snapshot => {
                    let userDetails = snapshot.val()
                    commit('setUserDetails', {
                        name: userDetails.name,
                        email: userDetails.email,
                        userId: userId
                    })
                })
                dispatch('firebaseUpdateUser', {
                    updates: {
                        online: true
                    },
                    userId
                })
                dispatch('firebaseGetUsers')
                this.$router.push('/')
            }
            else{
                //user logged out 
                dispatch('firebaseUpdateUser', {
                    userId: state.userDetails.userId,
                    updates: {
                        online: false
                    }
                })
                commit('setUserDetails', {}) 
                this.$router.replace('/auth')

            }
        })
    },
    firebaseUpdateUser({}, payload) {
        if(payload.userId) {
            firebaseDb.ref('users/'+payload.userId).update(payload.updates)
        }
    },
    userLogOut() {
        firebaseAuth.signOut()
    },
    firebaseGetUsers({ commit }) {
        firebaseDb.ref('/users').on('child_added', snapshot => {
            let userId = snapshot.key
            let userDetails = snapshot.val()
            commit('addUser',{
                userId,
                userDetails
            })
        })
        firebaseDb.ref('/users').on('child_changed', snapshot => {
            let userId = snapshot.key
            let userDetails = snapshot.val()
            commit('updateUser',{
                userId,
                userDetails
            })
        })
    },
    firebaseGetMessages({commit}, payload) {
        let userId = state.userDetails.userId
        messageRef = firebaseDb.ref('chats/' + userId + '/' + payload)
        messageRef.on('child_added', snapshot => {
            let messageDetails = snapshot.val()
            commit('getMessages', {
                messageId: snapshot.key,
                messageDetails
            })
        })
    },
    firebaseStopGettingMessages({ commit }) {
        messageRef.off('child_added')
        commit('clearMessages')
    },
    firebaseAddMessages({}, payload) {
        firebaseDb.ref('chats/'+state.userDetails.userId+'/'+payload.otherUserId).push(payload.message)
        payload.message.from = 'them'
        firebaseDb.ref('chats/'+payload.otherUserId+'/'+state.userDetails.userId).push(payload.message)
    }
}
const getters = {
    users: state => {
        let usersFiltered = {}
        Object.keys(state.users).forEach(key => {
            if(key != state.userDetails.userId){
                usersFiltered[key] = state.users[key]
            }
        })
        return usersFiltered
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}