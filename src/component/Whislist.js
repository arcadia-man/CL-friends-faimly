import axios from 'axios';
import { MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import ProductItem from './ProductItem';

const Whislist = () => {
  const { user } = useUserContext();
  const [product, setProduct] = useState([]);
  const getProduct = async (user_id = 0, is_wishlist_call = false) => {
    try {
      const response = await axios.get(`http://10.50.240.199:3000/list_product?user_id=${user_id}&&is_wishlist_call=${is_wishlist_call}`);
      setProduct(response.data.result)
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  useEffect(() => {
    getProduct(user.user_id, true);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }} className='pb-5 myBackground'>
      <MDBContainer>
        <div className="row">
          {
            product.map((item) => (
              <div key={item.product_id} className="col-12 col-sm-6 col-md-4">
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