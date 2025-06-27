import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyA760A3u4jPGjq0verrZ1JpjYXnDJo4Ukg",
  authDomain: "ladder-lessons.firebaseapp.com",
  projectId: "ladder-lessons",
  storageBucket: "ladder-lessons.firebasestorage.app",
  messagingSenderId: "1012798746977",
  appId: "1:1012798746977:web:b239f0713b9d29fab79520",
  measurementId: "G-GNLLTFQEJF"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)

export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('email')
googleProvider.addScope('profile')

if (import.meta.env.DEV && typeof window !== 'undefined') {
  try {
    if (!auth._delegate._config.emulator) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    }
    if (!db._delegate._databaseId.projectId.includes('localhost')) {
      connectFirestoreEmulator(db, 'localhost', 8080)
    }
    if (!storage._delegate._host.includes('localhost')) {
      connectStorageEmulator(storage, 'localhost', 9199)
    }
    if (!functions._delegate._url.includes('localhost')) {
      connectFunctionsEmulator(functions, 'localhost', 5001)
    }
  } catch (error) {
    console.log('Firebase emulators connection skipped:', error.message)
  }
}

export default app


