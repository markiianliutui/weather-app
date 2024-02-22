import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

import firebaseConfig from './config'

class Firebase {
  constructor() {
    this.firebase = initializeApp(firebaseConfig)
    this.auth = getAuth()
    this.fireStore = getFirestore(this.firebase)

    this.provider = new GoogleAuthProvider()
  }

  signInWithGoogle = () => signInWithPopup(this.auth, this.provider)
  signOut = () => signOut(this.auth)
}

export default Firebase
