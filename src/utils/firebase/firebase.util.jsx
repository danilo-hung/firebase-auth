import { initializeApp } from "firebase/app"
import {
    getAuth,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBOlpkruItVaqzyCt6CQ_yu-43KUaW_XEc",
    authDomain: "test-data-daniloh.firebaseapp.com",
    projectId: "test-data-daniloh",
    storageBucket: "test-data-daniloh.appspot.com",
    messagingSenderId: "817729309112",
    appId: "1:817729309112:web:573939b5a462751ea8674d"
};



// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Auth
export const auth = getAuth(firebaseApp)
//procider Config
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
// provider.setCustomParameters({prompt:"select_account"})
export const googleSignInWithPopUp = () => signInWithPopup(auth, provider)
export const facebookSignInwithPopUp = () => signInWithPopup(auth, fbProvider)
export const emailSignIn = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const db = getFirestore(firebaseApp);
export const creatUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, "users", userAuth.uid)
    let userSnapShot = await getDoc(userDocRef);
    // console.log("snapShot", userSnapShot.data())
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const imgurl = userAuth.providerData[0].photoURL;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                imgurl,
                createAt,
                ...additionalInfo
            });
            userSnapShot = await getDoc(userDocRef);
        } catch (e) {
            console.log(e)
        }
    }
    return userDocRef
}
export const getAuthUserInformation = async (userId) => {
    const userDocRef = doc(db, "users", userId)
    const userSnapShot = await getDoc(userDocRef);
    return userSnapShot.data()
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const userSignOut = async () => {
    try {
        await signOut(auth);
        console.log("Sign out OK")
    } catch (e) {
        console.log(e)
    }
}