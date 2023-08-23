import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import Header from '../Header/Header';
import { PostContext } from '../../store/postContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import firebase from '../../firebase/config';
function View() {

  const [userDetails, setUserDetails] = useState();
  const {postDetails} = useContext(PostContext);
  const sellerId = postDetails && postDetails[0].userId;
  const firestore = getFirestore(firebase);

  useEffect(()=> {
    if(sellerId){
      const q = query(collection(firestore, 'users'), where('id', '==', sellerId));
      getDocs(q).then((response)=> {
        if(response.empty){
          console.log('User not found');
        }else{
          setUserDetails(response.docs[0].data());
        }
      })
    }
  }, [firestore, sellerId]);

  console.log(postDetails, "Post Details");

  return (
    <>
    <Header/>

    { postDetails ? (

    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails[0].image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails[0].price} </p>
          <span>{postDetails[0].name}</span>
          <p>{postDetails[0].category}</p>
          <span>{postDetails[0].createdDate}</span>
        </div>

        { userDetails && (

        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
        )}
      </div>
    </div>
    ) : (
      <div>No data please</div>
      )}
    </>
    );
}
export default View;
