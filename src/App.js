import React, {useContext, useEffect} from 'react';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Create from './Pages/Create';
import Login from './Pages/Login';
import {AuthContext} from './store/Context';
import { Routes, Route,Navigate} from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import firebase from './firebase/config';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import View from './Components/View/View';
import Post from './store/postContext';


function App() {
  const {user, setuser} = useContext(AuthContext);
  const auth = getAuth(firebase)
  const firestore = getFirestore(firebase)
  
  useEffect(()=> {
    auth.onAuthStateChanged(async(user)=> {
      console.log(user,"Auth data")
      if (user) {
        const q = query(collection(firestore, 'users'), where('id', '==', user.uid))
        const querySnapshot = await getDocs(q);

        if(querySnapshot.empty){
          console.log('User not found');
        }else{
          const user = querySnapshot.docs[0].data();
          console.log(user,"db data");
          setuser(user)
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Post>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={!user?<Signup />:<Navigate to ='/' /> }/>
        <Route path='/login' element={!user?<Login/>:<Navigate to='/' />}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/view' element={<View/>}/>
      </Routes>
      </Post>
    </div>
  );
}

export default App;
