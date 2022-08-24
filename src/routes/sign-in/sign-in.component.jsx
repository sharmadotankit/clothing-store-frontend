import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

const SignIn = () => {

	const logGoogleUser = async () =>{
		const {user} = await signInWithGooglePopup();
		console.log(user);
		const userDocRef = await createUserDocumentFromAuth(user);
		
	}

    return (
        <div>
	        <h1>
	        	Signin
	        </h1>
	        <button onClick={logGoogleUser} >Signin with Google</button>
        </div>
    );
};

export default SignIn;
