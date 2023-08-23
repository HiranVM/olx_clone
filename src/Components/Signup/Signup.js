/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import firebase from '../../firebase/config';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  

  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log(firebase);

    const auth = getAuth(firebase);
    const firestore = getFirestore(firebase);
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (user) => {
              console.log(user,"user vanuuuu");
              await  addDoc(collection(firestore, 'users'), {
                id: user.user.uid,
                username: username,
                email: email,  
                phone: phone,
              }).then(()=> {
                navigate('/login');
              })
            })
            .catch((error) => {
              const errorCode = error.code;
              console.log(errorCode);
              const errorMessage = error.message;
              console.log(errorMessage);
            });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
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
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=> navigate('/login')} href=''>Login</a>
      </div>
    </div>
  );
}
