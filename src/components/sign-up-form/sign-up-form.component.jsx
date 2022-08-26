import {useState} from 'react';
import FormInput from '../form-input/form-input.component.jsx';
import './sign-up-form.style.scss';
import Button from '../button/button.component.jsx';
import {
    createAuthUserWithEmailAndPassword,
    // auth,
    createUserDocumentFromAuth}
     from '../../utils/firebase/firebase.utils';


const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignUpForm = () => {
    const [formFields,setFormFields] = useState(defaultFormFields);
const {displayName,email,password,confirmPassword} = formFields;

    // console.log(formFields)

    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields, [name]:value})
    }

    const resetFormField = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormField();
        }
        catch(error){
            if(error.code ===  'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else{
                console.log('error creating user'+error.message)
            }
        } 
    }

    return (
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span> Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
        

        <FormInput 
        label="Display Name"
        type="text"  
        name="displayName" 
        value={displayName} 
        required
        onChange={handleChange}
        />

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

        <FormInput 
        label="Confirm Password" 
        type="password" 
        name="confirmPassword" 
        value={confirmPassword} 
        required 
        onChange={handleChange}
        />

        <Button buttonType='inverted' type='submit'>Sign Up</Button>
        </form>
        </div>
        );
};



export default SignUpForm;
