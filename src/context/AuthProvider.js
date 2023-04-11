import React, { Children, createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';


 export const AuthContext =createContext()
const auth= getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user ,setUser]= useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const createUser=(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn =(email ,password)=> {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = () => {
        setIsLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect( ()  => {
      const unSubscribe=  onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser,'ovser currentUser')
            setUser(currentUser)
            
        })
        return  () => unSubscribe()
    },[])

    const logout=() =>{
        return signOut(auth)
    }
    const updateUser = profile => {
        setIsLoading(true)
        return updateProfile(auth.currentUser, profile);
    }
    // const updateUser = (profile) =>{
    //     return updateProfile(auth.currentUser, profile);
    // }
    ///////
    // const updateUserProfile=( name, photo)=>{
    //     return updateProfile( auth.currentUser)
    // }

    
    
   
    
    const authInfo={
        createUser,
        signIn,
        signInWithGoogle,
        user,
        logout,
        updateUser,
        isLoading,
        setIsLoading
        
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;