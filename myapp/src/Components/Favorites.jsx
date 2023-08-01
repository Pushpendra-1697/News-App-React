import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import EveryCard from './EveryCard';
import { AiOutlineClear } from 'react-icons/ai';

const Favorites = () => {
    const [FavoriteArticles, setFavoriteArticles] = useState([]);

    useEffect(() => {
        setFavoriteArticles(JSON.parse(localStorage.getItem('FavoriteArticles')) || []);
    }, []);

    const handleClear = () => {
        localStorage.removeItem('FavoriteArticles');
        setFavoriteArticles([]);
    };


    console.log(FavoriteArticles);
    return (
        <Box width={'90%'} m='auto'>
            <Navbar />

            <Box mb='2%' display={'grid'} gridTemplateColumns={['repeat(1,1fr)', 'repeat(1,1fr)', 'repeat(3,1fr)']} gap={'20px'}>
                {FavoriteArticles.length===0 ? <Heading color={'red'} fontSize={'50px'}>No Items 😒</Heading> : FavoriteArticles.map(({ urlToImage, title, description, author, publishedAt, url
                }, index) =>
                    <>
                        <EveryCard index={index} author={author} title={title} description={description} publishedAt={publishedAt} url={url} urlToImage={urlToImage} />
                    </>
                )}
            </Box>

            <AiOutlineClear onClick={handleClear} fontSize={'45px'} color='red' />
        </Box>
    );
}

export default Favorites;