import { useState } from 'react';



// import {getRedirectResult} from 'firebase/auth';
import {
    // auth,   
    signInAuthWithEmailAndPassword,
    // signInWithGoogleRedirect,
    signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';


import Button from '../button/button.component.jsx';
import FormInput from '../form-input/form-input.component.jsx';

import './sign-in-form.style.scss';



const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    // Code for signin with redirect 
    /*
    useEffect( ()=>{
        async function getResponse(){
            const response = await getRedirectResult(auth);
            
            if(response){
                const userDocRef = await createUserDocumentFromAuth(response.user);
                console.log(userDocRef);
            }   
        }
        getResponse();
        
    },[]);
    */

    // console.log(formFields)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthWithEmailAndPassword(email, password);
            resetFormField();
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password': alert("Incorrect password for email");
                    break;
                case 'auth/user-not-found': alert("No user associated with this email");
                    break;
                default: console.log(error);
            }
        }
    }


    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }


    return (
        <div className='sign-in-container'>
            <form onSubmit={handleSubmit}>
                <h2>Already have an account?</h2>
                <span>Sign in with your email and password</span>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={handleChange}
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    required
                    onChange={handleChange}
                />

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle} >Google Signin</Button>
                    {/*<button onClick={signInWithGoogleRedirect} >Signin with Google Redirect </button>*/}
                </div>

            </form>
        </div>
    );
};



export default SignInForm;
