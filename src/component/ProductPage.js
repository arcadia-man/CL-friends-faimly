import axios from 'axios';
import { MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import ProductItem from './ProductItem';

const ProductPage = () => {
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
    getProduct((user && user.status) ? user.user_id : 0, false);
  }, [user]);

  function changeWishList(is_wishlist, response, product_id){
    if (response.status === 200) {
      console.log(is_wishlist, response)
      let items = product;
      items = items.map((item) => {
        if (item.product_id === product_id) {
          return { ...item, is_wishlist: !is_wishlist }; 
        }
        return item;  
      });
      setProduct(items);
    }
  }

  const setWishlist = async (user_id, product_id, is_wishlist) => {
    try {
      if(is_wishlist){
        const response = await axios.get(`http://10.50.240.199:3000/remove_wishlist?user_id=${user_id}&&product_id=${product_id}`);
        changeWishList(is_wishlist, response.data, product_id)
      }
      else{
        const response = await axios.get(`http://10.50.240.199:3000/add_wishlist?user_id=${user_id}&&product_id=${product_id}`);
        changeWishList(is_wishlist, response.data, product_id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ minHeight: "100vh" }} className='myElement myBackground pb-5'>
      <MDBContainer>
        <h2 className="font-weight-bold text-center p-2" style={{ fontFamily: 'Caveat, cursive' }}> Khul Ke Karo Express </h2>
        <div className="row">
          {
            product.map((item) => (
              <div key={item.product_id} className="col-12 col-sm-6 col-md-4">
                <ProductItem key={item.product_id} item={item} event_type={setWishlist} event_from="pd_page" />
              </div>
            ))
          }
        </div>
      </MDBContainer>
    </div>
  );
};

export default ProductPage;
