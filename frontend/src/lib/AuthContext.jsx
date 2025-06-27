import { createContext, useContext, useEffect, useState } from 'react'
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from './firebase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Sign up with email and password
  const signup = async (email, password, userData) => {
    try {
      setError(null)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update user profile
      await updateProfile(user, {
        displayName: userData.name
      })

      // Create user document in Firestore
      await createUserDocument(user, userData)
      
      return user
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Sign in with email and password
  const signin = async (email, password) => {
    try {
      setError(null)
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return user
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Sign in with Google
  const signinWithGoogle = async () => {
    try {
      setError(null)
      const { user } = await signInWithPopup(auth, googleProvider)
      
      // Check if user document exists, create if not
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists()) {
        await createUserDocument(user, {
          name: user.displayName,
          email: user.email,
          school: ''
        })
      }
      
      return user
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Sign out
  const logout = async () => {
    try {
      setError(null)
      await signOut(auth)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Create user document in Firestore
  const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return

    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      const { displayName, email } = user
      const createdAt = new Date()

      try {
        await setDoc(userRef, {
          email,
          role: 'teacher',
          subscription: {
            plan: 'free',
            status: 'active',
            stripeCustomerId: null,
            currentPeriodEnd: null
          },
          profile: {
            name: displayName || additionalData.name || '',
            school: additionalData.school || '',
            verified: false,
            createdAt
          },
          progress: {
            completedGroups: [],
            currentGroup: 'group-1',
            lastAccessed: createdAt
          },
          ...additionalData
        })
      } catch (error) {
        console.error('Error creating user document:', error)
        throw error
      }
    }
  }

  // Get user data from Firestore
  const getUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      return userDoc.exists() ? userDoc.data() : null
    } catch (error) {
      console.error('Error getting user data:', error)
      return null
    }
  }

  // Update user data in Firestore
  const updateUserData = async (uid, data) => {
    try {
      const userRef = doc(db, 'users', uid)
      await setDoc(userRef, data, { merge: true })
    } catch (error) {
      console.error('Error updating user data:', error)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get additional user data from Firestore
        const userData = await getUserData(user.uid)
        setUser({ ...user, userData })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signinWithGoogle,
    logout,
    getUserData,
    updateUserData,
    createUserDocument
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext

