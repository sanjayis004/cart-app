// Cart.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import Cookies from 'js-cookie'

const Cart = (props) => {
    const [cartProductList,setCartProductList] = useState([])
    
    useEffect(() => {
        const userDetails = JSON.parse(Cookies.get('cartUserDetails'))
        const config = {
            method: 'get',
            url: `https://fakestoreapi.com/carts/user/${userDetails.userId}`,
            headers: {}
        };
        axios(config)
            .then(function (response) {
                const productList = response.data[0]['products']
                const promiseList  = []
                for(let product of productList){
                    promiseList.push(axios(`https://fakestoreapi.com/products/${product.productId}`))
                }
                Promise.all(promiseList).then((promiseResult)=>{
                    const dataArr = promiseResult.map((promiseResultData)=> {
                        const cartObj = productList.find((product)=>{
                            return product.productId === promiseResultData.data.id 
                        })
                    return {...promiseResultData.data ,...cartObj}
                })
                    setCartProductList(dataArr)
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <CartContainer>
            <h2>Your Cart</h2>
            {cartProductList.length === 0 ? (
                <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
            ) : (
                <ProductList>
                    {cartProductList.map((item) => (
                        <CartItem key={item.id}>
                            <ProductImage src={item.image} alt={item.title} />
                           
                            <ProductInfo>
                                <ProductName>{item.title}</ProductName>
                                <ProductPrice>Price: ${item.price}</ProductPrice>
                                <Quantity>{`Quantity: ${item.quantity}`}</Quantity>
                            </ProductInfo>
                        </CartItem>
                    ))}
                </ProductList>
            )}
        </CartContainer>
    );
};

// Styled components
const CartContainer = styled.div`
  margin: 20px;
`;

const EmptyCartMessage = styled.p`
  font-size: 1.2em;
  text-align: center;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CartItem = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
`;

const ProductImage = styled.img`
  max-width: 80px;
  height: auto;
  margin-right: 10px;
`;


const ProductInfo = styled.div`
  /* Styles for the product information */
`;

const ProductName = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
`;

const Quantity = styled.p`
  font-size: 1em;
`;

export default Cart;
