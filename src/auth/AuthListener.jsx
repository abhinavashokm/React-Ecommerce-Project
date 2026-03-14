import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";
import { setUser } from "../store/authSlice";


export default function AuthListener() {
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(setUser({
                    id: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName
                }))
            }else{
                dispatch(setUser(null))
            }
        })
        return unsubscribe
    }, [])

    return null
}