import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebse.config';
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const AuthProider = ({children}) => {
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email,password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const loginwithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect( () => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      // 
      setUser(currentUser);
      setLoading(false);
    })
    return () => {
      return unSubscribe();

    }
  },[])

  const authInfo = {
    user,
    createUser,
    loginwithGoogle,
    loading,
    login,
    logout
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProider