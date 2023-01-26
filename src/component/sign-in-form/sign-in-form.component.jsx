import { useState } from "react";
import {
    googleSignInWithPopUp,
    facebookSignInwithPopUp,
    emailSignIn,
    creatUserDocumentFromAuth,
    getAuthUserInformation,
    userSignOut
} from "../../utils/firebase/firebase.util"
import InputForm from "../input-form/input-form.component";
import "./sign-in-form.style.scss"

const defaultFormFields = {
    createAt: "",
    displayName: "",
    email: "",
    imgUrl: ""
}

const defaultEmailFormFields = {
    email: "",
    password: ""
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [isSignIn, setIsSignIn] = useState(false);
    const [emailFormFields, setEmailFormFields] = useState(defaultEmailFormFields);
    const [errorMsg, setErrorMsg] = useState("")

    const onchangeSignIn = (event) => {
        const { name, value } = event.target;
        setEmailFormFields({ ...emailFormFields, [name]: value })
    }


    const logInWith = async (method) => {
        try {
            await method
        } catch (e) {
            if (e.code === "auth/user-not-found") {
                setErrorMsg("email not found")
            } else if(e.code==="auth/wrong-password"){
                setErrorMsg("email or password is incorrect")
            }
                else {
                console.log(e)
            }

        }
        const { user } = await method;
        const { id } = await creatUserDocumentFromAuth(user);
        const userInfo = await getAuthUserInformation(id);
        const { createAt, displayName, email, imgurl } = userInfo;
        const createAtToDate = createAt
            .toDate()
            .toString()
        const createAtDateAndTime = createAtToDate.replace(/\s\d{2}:\d{2}:\d{2}\sGMT.*$/, "")
        setFormFields({ createAt: createAtDateAndTime, displayName: displayName, email: email, imgUrl: imgurl })
        setIsSignIn(true)
    }

    const logInWithGoogle = () => logInWith(googleSignInWithPopUp())

    const logInWithFb = () => logInWith(facebookSignInwithPopUp())

    const logInWithEmail = () => logInWith(emailSignIn(emailFormFields.email, emailFormFields.password))

    const signIn = async (event) => {
        event.preventDefault();
        logInWithEmail()
        console.log("submit")
    }
    const signOut = async (event) => {
        event.preventDefault();
        userSignOut()
        setIsSignIn(false)
        setErrorMsg("")
    }
    return (
        <section className="sign-in-form-container">
            {
                !isSignIn ? (
                    <>
                        {/* show Sign In Form */}
                        <form onSubmit={signIn}>
                            <InputForm
                                label="Email"
                                htmlFor="signInEmail"
                                id="signInEmail"
                                type="email"
                                name="email"
                                value={emailFormFields.email}
                                onChange={onchangeSignIn}
                                required
                            />
                            <InputForm
                                label="Password"
                                htmlFor="signInPassword"
                                id="signInPassword"
                                type="password"
                                name="password"
                                value={emailFormFields.password}
                                onChange={onchangeSignIn}
                                required
                            />
                            {errorMsg ? (
                                <p className="error-msg">{errorMsg}</p>
                            ) : (
                                null
                            )}
                            <button className="button" type="submit">Sign In</button>
                        </form>
                        <button className="button" onClick={logInWithGoogle}><i className="fa-brands fa-google"></i>Google</button>
                        <button className="button" onClick={logInWithFb}><i className="fa-brands fa-facebook-f"></i>Facebook</button>

                    </>

                ) : (

                    <>
                        {/* show Sign Out Option */}
                        <div className="sign-in-msg">
                            <h2>Welcome Back, {formFields.displayName}</h2>
                            <p>your email is : {formFields.email}</p>
                            <p>you registered at : {formFields.createAt}</p>
                            <button className="button" onClick={signOut}>Sign Out</button>
                        </div>

                    </>
                )
            }


        </section>
    )
}

export default SignInForm