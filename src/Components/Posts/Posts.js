import React,{useState, useEffect, useContext} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import {collection, getDocs, getFirestore} from 'firebase/firestore'
import firebase from '../../firebase/config';
import { useNavigate} from 'react-router-dom'
import  {PostContext}  from '../../store/postContext';

function Posts() {
  const firestore = getFirestore(firebase);
  const [products, setproducts] = useState([]);

const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchedProducts = [];
    getDocs(collection(firestore, "products")).then((response)=> {
      response.forEach((doc)=> {
        console.log(doc);
        const productData ={
          ...doc.data(),
          id: doc.id
        };
        fetchedProducts.push(productData);
      });
      setproducts(fetchedProducts);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(products,"Products vanuu");

  function handleView (params){
    const filteredProducts = products.filter(product => (product.id === params));
    setPostDetails(filteredProducts);
    navigate('/view');
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map((product, index)=> {
              return(
          <div className="card" onClick={()=> {handleView(product.id)}} key={index}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.image} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price} </p>
              <span className="kilometer">{product.name}</span>
              <p className="name">{product.category}</p>
            </div>
            <div className="date">
              <span>{product.createdDate}</span>
            </div>
          </div>
          )
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/6/2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
