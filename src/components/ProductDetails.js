
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRatingChip from './StarRatingChip';
import AddToCartButton from './AddToCartButton';
import Cookies from 'js-cookie';
import BuyNowButton from './BuyNowButton';


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details based on the id parameter
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data));
    }, [id]);

    // Render a loading state while waiting for the product details to load
    if (!product) {
        return <div>Loading...</div>;
    }
    const addItemToCart = (product) => {
        console.log("product", product)
        const userId = JSON.parse(Cookies.get('cartUserDetails'))
        var data = JSON.stringify({
            "userId": userId,
            "date": new Date(),
            "products": [
                {
                    "productId": product.id,
                    "quantity": 1
                }
            ]
        });

        const config = {
            method: 'post',
            url: 'https://fakestoreapi.com/carts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleCartButton = (product) => {
        console.log("in handle cart button...", product)
        // ad item to cart -use api
        addItemToCart(product)
        window.location.href = '/cart';
    }
    return (
        <Container>
            <ProductImage src={product.image} alt="Product Image" /> 
            <DetailsContainer>
                <StyledContainer>
                    <ProductName>{product.title}</ProductName>
                    <StarRatingChipContainer>
                        <StarRatingChip rating={product.rating.rate} count={product.rating.count} />
                    </StarRatingChipContainer>
                    <ProductPrice>
                        Price: <StyledPrice>${product.price}</StyledPrice>
                    </ProductPrice>

                    <DescriptionContainer>
                        <DescriptionTitle>Product Description:</DescriptionTitle>
                        <StyledPaper>
                            <ProductDescription>{product.description}</ProductDescription>
                        </StyledPaper>
                    </DescriptionContainer>
                    <AddToCartButton onClick={() => handleCartButton(product)}>Add to Cart</AddToCartButton>
                <BuyNowButton >Buy Now</BuyNowButton>
                </StyledContainer>
                
            </DetailsContainer>
        </Container>
    );


};

const StyledContainer = styled.div`
  max-width: 600px;
  height:370px;
  margin: 10px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 8px;
`;



const ProductName = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const StyledPrice = styled.span`
  color: green;
  font-weight: bold;
`;

const DescriptionContainer = styled.div`
  margin-top: 10px;
`;

const DescriptionTitle = styled.span`
  font-weight: bold;
  margin-bottom: 1px;
`;

const StyledPaper = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
`;

const ProductDescription = styled.p`
  /* Styling for product description */
`;

const StarRatingChipContainer = styled.div`
  margin-top: 20px;
`;


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `;

const ProductImage = styled.img`
    width: 400px;
    height: 400px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding:10px;
  `;

const DetailsContainer = styled.div`
    margin-left: 20px;
  `;

export default ProductDetails;


