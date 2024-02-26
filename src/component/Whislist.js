import { MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import ProductItem from './ProductItem';

const Whislist = () => {
  const { product, getProduct } = useUserContext();
  const { user } = useUserContext();

  useEffect(() => {
    getProduct(user.user_id, true);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }} className='pb-5 myBackground'>
      <MDBContainer>
        <div className="row">
          {
            product.map((item) => (
              <div key={item} className="col-12 col-sm-6 col-md-4">
                <ProductItem key={item.product_id} item={item} />
              </div>
            ))
          }
        </div>
      </MDBContainer>
    </div>
  );
}

export default Whislist