import './Users.scss';
import { loginUserApiRequest } from '../../utils/apiUtils';
import Button from '../../Components/Button/Button';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const initialState = {
    username: '',
    password: '',
    submissionError: false
}

interface ILoginProps {
  // function to update user state
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogIn: React.FC<ILoginProps> = ({ setUserLoggedIn }) => {
    const [state, setState] = useState(initialState);
    let navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {username, password};
        loginUserApiRequest(user, onUserAPIResponse, onUserAPIError)
    }

    const handleCancel = () => {
        setState(initialState)
    }

    const onUserAPIResponse = (apiResponse: any) => {
      let token = apiResponse.token;
      sessionStorage.setItem('authToken', token);
      setUserLoggedIn(true);
      goToHome();
    };
  
    const onUserAPIError = (error: any) => {
      setState({
        ...state,
        submissionError: true
      });
    };

    const { username, password, submissionError } = state;

    return (
        <main className="login">
            <h2>Log in</h2>
            {submissionError && <p className='login__error'>Incorrect username or password</p>}
            <form className="login__form" onSubmit={handleSubmit}>
                <label htmlFor='username' className='login__label'>Username</label>
                <input className='login__field' type='text' name='username' value={username} onChange={handleInputChange} placeholder='>>'/>
                <label htmlFor='password' className='login__label'>Password</label>
                <input className='login__field' type='password' name='password' value={password} onChange={handleInputChange} placeholder='>>'/>
                <div className="login__buttons">
                    <Button text="Clear" type="reset" extraClass='cancel' onClick={handleCancel}/>
                    <Button text="Log In" type="submit"/>
                </div>
                <p className="login__footnote">Not yet a user? <Link to='/signup'>Sign up!</Link></p>
            </form>
        </main>
    );
};

export default LogIn;