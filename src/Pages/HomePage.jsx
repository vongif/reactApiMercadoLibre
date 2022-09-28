import React from 'react';
import ProductosApi from '../Components/ProductosApi';
import firebase from '../Config/firebase';



function HomePage() {

  console.log(firebase)
  return (
    <div className='App'>
      
      <ProductosApi />

    </div>
    
  );

}
export default HomePage;
