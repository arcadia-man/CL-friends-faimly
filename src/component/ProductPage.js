import { MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import ProductItem from './ProductItem';

const ProductPage = () => {
  const {user, product, getProduct } = useUserContext(); 

  useEffect(() => {
    getProduct((user && user.status) ? user.user_id : 0, false);
  }, [user]);

  return (
    <div style={{  minHeight: "100vh" }} className='myElement myBackground pb-5'>
      <MDBContainer>
        <h2 className="font-weight-bold text-center p-2" style={{ fontFamily: 'Caveat, cursive' }}> Khul Ke Karo Express </h2>
        <div className="row">
          {
            product.map((item) => (
              <div key={item.product_id} className="col-12 col-sm-6 col-md-4">
                <ProductItem key={item.product_id} item={item}/>
              </div>
            ))
          }
        </div>
      </MDBContainer>
    </div>
  );
};

export default ProductPage;
