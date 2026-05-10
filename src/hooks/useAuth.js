import React, { useEffect, useState } from 'react'
import {auth} from '../services/firebase'
import {onAuthStateChanged} from 'firebase/auth'

const useAuth = () => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);


    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })

        return ()=>unsubscribe();
    },[])
  return {user,loading}
}

export default useAuth