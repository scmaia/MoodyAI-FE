import './Users.scss';
import { registerUserApiRequest } from '../../utils/apiUtils';
import Button from '../../Components/Button/Button';
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
    submissionSuccess: false
}

const SignUp: React.FC = () => {
    const [state, setState] = useState(initialState);
    let navigate = useNavigate();

    const goToLogin = () => {
      navigate("/login");
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (state.password.length === 0 || state.username.length === 0 ) {
            setState({
                ...state,
                errorMessage: 'Fields cannot be empty'
            })
            return;
        }

        if (state.password !== state.confirmPassword) {
            setState({
                ...state,
                errorMessage: 'Passwords do not match'
            })
            return;
        }

        if (!state.email.includes('@') || !state.email.includes('.')) {
            setState({
                ...state,
                errorMessage: 'Invalid email address'
            })
            return;
        }

        const newUser = {username, password, email}
        registerUserApiRequest(newUser, onUserAPIResponse, onUserAPIError)
    }

    const handleCancel = () => {
        setState(initialState)
    }

    const onUserAPIResponse = (apiResponse: any) => {
      setState({
        ...initialState,
        submissionSuccess: true
      });
      setTimeout(goToLogin, 4000);
    };
  
    const onUserAPIError = (error: any) => {
      setState({
        ...state,
        errorMessage: error
      })
    };

    const { username, email, password, confirmPassword, errorMessage, submissionSuccess } = state;

    return (
        <main className="signup">
            <h2>Register</h2>
            {submissionSuccess && <p className='signup__success'>Thank you for signing up! Please login to save and access your AI interactions from anywhere.</p>}
            {errorMessage && <p className='signup__error'>{errorMessage}</p>}
            <form className="signup__form" onSubmit={handleSubmit}>
                <label htmlFor='username' className='signup__label'>Username</label>
                <input className='signup__field' type='text' name='username' value={username} onChange={handleInputChange} placeholder='>>'/>
                <label htmlFor='email' className='signup__label'>Email</label>
                <input className='signup__field' type='text' name='email' value={email} onChange={handleInputChange} placeholder='>>'/>
                <label htmlFor='password' className='signup__label'>Password</label>
                <input className='signup__field' type='password' name='password' value={password} onChange={handleInputChange} placeholder='>>'/>
                <label htmlFor='confirmPassword' className='signup__label'>Confirm Password</label>
                <input className='signup__field' type='password' name='confirmPassword' value={confirmPassword} onChange={handleInputChange} placeholder='>>'/>
                <div className="signup__buttons">
                    <Button text="Clear" type="reset" extraClass='cancel' onClick={handleCancel}/>
                    <Button text="Sign Up" type="submit"/>
                </div>
            </form>
        </main>
    );
};

export default SignUp;