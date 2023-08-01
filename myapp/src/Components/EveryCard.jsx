import { Box, Img, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';

var FavoriteArticles = JSON.parse(localStorage.getItem('FavoriteArticles')) || [];
const EveryCard = ({ index, urlToImage, url, publishedAt, author, title, description }) => {
    const [toggler, setToggler] = useState(false);


    const handleFavorite = () => {
        setToggler(!toggler);
        let payload = { url, urlToImage, publishedAt, author, title, description };
        FavoriteArticles.push(payload);
        localStorage.setItem('FavoriteArticles', JSON.stringify(FavoriteArticles));
    };


    return (
        <Box padding={'3px'} boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" borderRadius={'10px'} key={index
        }>
            <Img borderRadius={'5px'} mb='2%' w={'100%'} h='250px' src={urlToImage} alt={title} />
            <Text mb='2%' lineHeight={'16px'}>Title: {title}</Text>
            <Text mb='2%'>Author: {author}</Text>
            <Text lineHeight={'16px'} mb='2%'>Description: {description}</Text>
            <Text mb='2%'>PublishedAt: {publishedAt}</Text>
            <Text fontSize={'23px'} color={'red'}><Link target='_blank' to={url}>MORE</Link></Text>
            <AiOutlineHeart color={toggler ? 'red' : 'black'} onClick={handleFavorite} fontSize={'25px'} />
        </Box>
    );
}

export default EveryCard;