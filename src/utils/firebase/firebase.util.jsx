import { initializeApp } from "firebase/app"
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
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
const auth = getAuth(firebaseApp)
//procider Config
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
// provider.setCustomParameters({prompt:"select_account"})
export const googleSignInWithPopUp = () => signInWithPopup(auth, provider)
export const facebookSignInwithPopUp = () => signInWithPopup(auth, fbProvider)

export const db = getFirestore(firebaseApp);
export const creatUserDocumentFromAuth = async(userAuth)=>{
    const userDocRef = doc(db, "users", userAuth.uid)
    const userSnapShot = await getDoc(userDocRef);
    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const imgurl = userAuth.providerData[0].photoURL;
        const createAt = new Date();
        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                imgurl,
                createAt
            });
        } catch(e){
            console.log(e)
        }
    }
    return userDocRef
}