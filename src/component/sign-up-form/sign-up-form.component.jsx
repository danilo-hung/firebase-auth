import { createAuthUserWithEmailAndPassword, creatUserDocumentFromAuth } from "../../utils/firebase/firebase.util"
import InputForm from "../input-form/input-form.component"
import { useState } from "react"

import "./sign-up-form.style.scss"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    comfirmPassword: ""
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const [isRegister, setIsRegister] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const { displayName, email, password, comfirmPassword } = formFields;

    // console.log(formFields)

    const onchangehandler = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (password !== comfirmPassword) {
            alert("password is not equal to comfirmPassword")
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await creatUserDocumentFromAuth(user, { displayName });
            setIsRegister(true)
        } catch (e) {
            if (e.message === "Firebase: Error (auth/email-already-in-use).") {
                setErrorMsg("the email has been used")
                setFormFields(defaultFormFields)
            } else {
                console.log(e.message)
            }

        }
    }
    const registerAnotherAccount = () => {
        setFormFields(defaultFormFields);
        setIsRegister(false)
    }
    return (
        <section className="sign-up-form-container">
            {
                !isRegister ? (
                    <>
                        <form onSubmit={onSubmitHandler}>
                            <InputForm
                                label="Display Name"
                                htmlFor="displayName"
                                id="displayName"
                                type="text"
                                name="displayName"
                                value={displayName}
                                onChange={onchangehandler}
                                required
                            />
                            <InputForm
                                label="Email"
                                htmlFor="email"
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={onchangehandler}
                                required
                            />
                            <InputForm
                                label="Password"
                                htmlFor="password"
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onchangehandler}
                                required
                            />
                            <InputForm
                                label="Comfirm Password"
                                htmlFor="comfirmPassword"
                                id="comfirmPassword"
                                type="password"
                                name="comfirmPassword"
                                value={comfirmPassword}
                                onChange={onchangehandler}
                                required
                            />
                            {errorMsg ? (
                                <p className="error-msg">{errorMsg}</p>
                            ) : (
                                null
                            )}
                            <div className="submit-btn-container">
                                <button className="button" type="submit">
                                    Submit
                                </button>
                            </div>

                        </form>
                    </>
                ) : (
                    <>
                        <p className="sign-up-msg">Successfully Register</p>
                        <div className="submit-btn-container">
                            <button className="button" onClick={registerAnotherAccount}>Register another account</button>
                        </div>
                    </>
                )
            }
        </section>

    )
}

export default SignUpForm