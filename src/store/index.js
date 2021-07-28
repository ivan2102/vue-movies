import { createStore } from 'vuex'
import { auth, userCollection } from '../includes/firebase.js';

export default createStore({
  state: {

    authModalShow: false,
    userLoggedIn: false
  },
  mutations: {

    toggleAuthModal(state) {

      state.authModalShow = !state.authModalShow;
    },

    toggleAuth(state) {

      state.userLoggedIn = !state.userLoggedIn;
    }
  },
  actions: {

   async register(context, payload) {

    const userCred = await auth.createUserWithEmailAndPassword(

      payload.email,
      payload.password
    );

     await userCollection.doc(userCred.user.uid).set({

      name: payload.name,
      email: payload.email,
      age: payload.age,
      country: payload.country
    })

   await userCred.user.updateProfile({

      displayName: payload.name
    })

    context.commit('toggleAuth');
   },


 async login(context, payload) {

     await auth.signInWithEmailAndPassword(

      payload.email,
      payload.password
     )  

     context.commit('toggleAuth');
   },

   async signout(context) {

    await auth.signout();

    context.commit('toggleAuth');
   },


   init_login(context) {

    const user = auth.currentUser;

    if(user) {

       context.commit('toggleAuth');
    }
   }
  },
  getters: {

    authModalShow(state) {

     return state.authModalShow;
    }
  }
})
