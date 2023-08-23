/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase/config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, seterror] = useState('')

  const handleLogin = (e)=> {
    e.preventDefault();

    const auth = getAuth(firebase)
    signInWithEmailAndPassword(auth, email, password).then(()=> {
      navigate('/')
    }).catch((err)=> {
      console.log(err);
      let error = err.message.split('/')[1].split(")")[0].trim();
      seterror(error)
      setTimeout(()=> {
        seterror('');
      }, 3000);
    })

  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"/>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"/>
          <br/>
          <br/>
          <div className='text-danger ml-5'>{error}</div>
          <button>Login</button>
        </form>
        <a href='' onClick={()=> navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
