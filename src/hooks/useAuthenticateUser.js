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
import { toast } from "react-toastify";

export default function useAuthenticateUser(email, password) {
    const [signedIn, setSignedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid);
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
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Successful sign-in
                    const user = userCredential.user;
                    console.log(user);
                    toast.success("Successfully signed in!", {
                        theme: "colored",
                    });
                    navigate("/");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, " - ", errorMessage);
                    toast.error("Invalid email or password", {
                        theme: "colored",
                    });
                });
        });
    }

    function handleUserAuthentication(isOpen, setIsOpen) {
        if (signedIn) {
            const auth = getAuth(app);
            signOut(auth).then(() => {
                toast.success("Successfully signed out!", {
                    theme: "colored",
                });
                setSignedIn(false);
            });
        } else {
            navigate("/Login");
        }

        isOpen && setIsOpen(false);
        return isOpen;
    }

    return { signedIn, handleSignIn, handleUserAuthentication, toast };
}
