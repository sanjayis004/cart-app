import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import axios from 'axios'
import TruncatedText from './TruncatedText';
import StarRatingChip from './StarRatingChip';

// Styled components
const ProductCard = styled(Card)`
  max-width: 300px;
  margin: 5px;
`;

const StyledPaper = styled(Paper)`
  padding: 100px;
`;


// Product component
const Product = ({ title, description, price, image, rating, showDetails }) => {


    return (
        <ProductCard elevation={3} onClick={showDetails}>
            <CardContent>
                <Box style={{ width: "250px", height: "320px" }}>
                    <img src={image} style={{ width: "250px", height: "200px" }} alt="missing-pic" />
                    <Box style={{
                        position: "relative",
                        height: "5px",
                        top: "20px",
                    }}>
                        <TruncatedText text={title} maxLength={25} />
                    </Box>

                    <Box style={{
                        position: "relative",
                        height: "10px",
                        top: "40px"
                    }}>
                        <Typography component="div" color="text.secondary" fontWeight="bold">
                            {price} $
                        </Typography>
                        <Box style={{
                            height: "10px"
                        }}>
                            <StarRatingChip rating={rating.rate} count={rating.count} />
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </ProductCard>
    );
};

// Product listing component
const ProductListing = (props) => {
    console.log(props)
    const [productList, setProductList] = useState([])
    useEffect(() => {
        const config = {
            method: 'get',
            url: 'https://fakestoreapi.com/products',
            headers: {}
        };
        axios(config)
            .then(function (response) {
                const list = response.data
                setProductList(list)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    const showDetails = (e, product) => {
        window.location.href = '/product/' + product.id;
    }

    return (
        <StyledPaper elevation={0}>
            <Typography variant="h4" gutterBottom>
                Product Listing
            </Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {productList.map((product, index) => (
                    <Product key={index} {...product} showDetails={(e) => showDetails(e, product)} />
                ))}
            </div>
        </StyledPaper>
    );
};

// App component
const Products = (props) => {
    //console.log(props)
    return (
        <div>
            <ProductListing />
        </div>
    );
};

export default Products;