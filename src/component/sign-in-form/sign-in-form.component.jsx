import { useState, useEffect } from "react";
import {
    googleSignInWithPopUp,
    facebookSignInwithPopUp,
    signInWithEmailAndPassword,
    creatUserDocumentFromAuth,
    getAuthUserInformation
} from "../../utils/firebase/firebase.util"
import InputForm from "../input-form/input-form.component";

const defaultFormFields = {
    createAt: "",
    displayName: "",
    email: "",
    imgUrl: ""
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [isSignIn, setIsSignIn] = useState(true);

    useEffect(()=>{
        setIsSignIn(!isSignIn)
    }, [formFields])

    const logInWith = async (method) => {
        const { user } = await method();
        const { id } = await creatUserDocumentFromAuth(user);
        const userInfo = await getAuthUserInformation(id);
        const { createAt, displayName, email, imgurl } = userInfo;
        const createAtToDate = createAt
            .toDate()
            .toString()
        const createAtDateAndTime = createAtToDate.replace(/\s\d{2}\:\d{2}\:\d{2}\sGMT.*$/,"")
        setFormFields({ createAt: createAtDateAndTime, displayName: displayName, email: email, imgUrl: imgurl })
    }

    const logInWithGoogle = () => logInWith(googleSignInWithPopUp)

    const logInWithFb = () => logInWith(facebookSignInwithPopUp)

    const signIn = async (event) => {
        event.preventDefault();
        console.log("submit")
    }
    const signOut = async(event) => {
        event.preventDefault();
        console.log("sign out")
    }
    return (
        <>
            {
                !isSignIn ? (
                    <>
                        {/* show Sign In Form */}
                        <h2>Sign In Form</h2>
                        <h3>Email Sign In</h3>
                        <form onSubmit={signIn}>
                            <InputForm
                                label="Email : "
                                htmlFor="signInEmail"
                                id="signInEmail"
                                type="email"
                                name="email"
                            // value={email}
                            // onChange={onchangehandler}
                            />
                            <InputForm
                                label="Password : "
                                htmlFor="signInPassword"
                                id="signInPassword"
                                type="password"
                                name="password"
                            // value={email}
                            // onChange={onchangehandler}
                            />
                            <button type="submit">Email Sign In</button>
                        </form>
                        <button onClick={logInWithGoogle}>Google Sign In</button>
                        <button onClick={logInWithFb}>Facebook Sign In</button>

                    </>

                ) : (

                    <>
                        {/* show Sign Out Option */}
                        <h2>Welcome Back, {formFields.displayName}</h2>
                        <p>your email is : {formFields.email}</p>
                        <p>you registered at : {formFields.createAt}</p>
                        <button onClick={signOut}>Sign Out</button>
                    </>

                )
            }


        </>
    )
}

export default SignInForm