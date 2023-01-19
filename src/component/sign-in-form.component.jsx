import { googleSignInWithPopUp,facebookSignInwithPopUp, creatUserDocumentFromAuth } from "../utils/firebase/firebase.util"
const SignInForm = () => {
    const logInWith = async(method) => {
        const {user} = await method();
        creatUserDocumentFromAuth(user)
    }
    const logInWithGoogle = () => logInWith(googleSignInWithPopUp)
    const logInWithFb = ()=> logInWith(facebookSignInwithPopUp)

    return (
        <>
            <h1>I am form</h1>
            <button onClick={logInWithGoogle}>Sign In with Google Account</button>
            <button onClick={logInWithFb}>Sign In with Facebook Account</button>
        </>
    )
}

export default SignInForm