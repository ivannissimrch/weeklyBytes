import {
    browserLocalPersistence,
    getAuth,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from "@firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../data/firebase";
import { is } from "date-fns/locale/is";

export default function useAuthenticateUser(email, password) {
    const [signedIn, setSignedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid);
                // navigate("/");
                setSignedIn(true);
            } else {
                setSignedIn(false);
            }
        });
    }, [navigate]);

    function handleSignIn(e) {
        e.preventDefault();
        const auth = getAuth(app);
        setPersistence(auth, browserLocalPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        });
    }

    function handleUserAuthentication(isOpen, setIsOpen) {
        if (signedIn) {
            const auth = getAuth();
            signOut(auth).then(() => {
                setSignedIn(false);
            });
        } else {
            navigate("/Login");
        }

        isOpen && setIsOpen(false);
        return isOpen;
    }

    return { signedIn, handleSignIn, handleUserAuthentication };
}
