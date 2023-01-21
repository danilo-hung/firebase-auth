import { createAuthUserWithEmailAndPassword, creatUserDocumentFromAuth } from "../../utils/firebase/firebase.util"
import InputForm from "../input-form/input-form.component"
import { useState } from "react"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    comfirmPassword: ""
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
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
        } catch (e) {
            if(e.message === "Firebase: Error (auth/email-already-in-use)."){
                alert("the email has been used")
            } else{
                console.log(e.message)
            }
            
        }
    }
    return (
        <>
            <h2>Sign Up Form</h2>
            <form onSubmit={onSubmitHandler}>
                <InputForm
                    label="Display Name : "
                    htmlFor="displayName"
                    id="displayName"
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={onchangehandler}
                />
                <InputForm
                    label="Email : "
                    htmlFor="email"
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onchangehandler}
                />
                <InputForm
                    label="Password : "
                    htmlFor="password"
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onchangehandler}
                />
                <InputForm
                    label="Comfirm Password : "
                    htmlFor="comfirmPassword"
                    id="comfirmPassword"
                    type="password"
                    name="comfirmPassword"
                    value={comfirmPassword}
                    onChange={onchangehandler}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </>
    )
}

export default SignUpForm