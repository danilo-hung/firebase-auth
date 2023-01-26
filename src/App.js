import SignInForm from './component/sign-in-form/sign-in-form.component';
import SignUpForm from './component/sign-up-form/sign-up-form.component';
import { useState } from 'react';

import './App.scss';

function App() {
  const [signInForm, setSignInForm] = useState(true)
  const showSignIn = () => { setSignInForm(true) }
  const showSignUp = () => { setSignInForm(false) }


  return (
    <div className='container'>
      <div className='authBox'>
        <h1>Authentication Demo</h1>
        <div className='btn-container'>
          <p onClick={showSignIn} className={signInForm? ("button choosed"):("button")}>
            Sign In
          </p>
          <p onClick={showSignUp} className={!signInForm? ("button choosed"):("button")}>
            Sign Up
          </p>
        </div>
        {signInForm ? (
          <SignInForm />
        ) : (
          <SignUpForm />
        )}
      </div>
    </div>
  );
}

export default App;
