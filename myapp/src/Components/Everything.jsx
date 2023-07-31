import { Box, Button, Heading, Text, Img, Input, useToast, Select } from '@chakra-ui/react';
import React, { useState } from 'react'
import Loading from './Loading';
import { Link } from 'react-router-dom';
import Error from './Error';
import Navbar from './Navbar';

const Everything = () => {
    const [value, setValue] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const toast = useToast();
    const [toggler, setToggler] = useState(false);


    const getData = async (e) => {
        let sort = e.target.value;
        try {
            setLoading(true);
            let res = await fetch(`https://newsapi.org/v2/everything?q=${title}&sortBy=${sort}&${process.env.REACT_APP_apiKey}`);
            res = await res.json();
            setLoading(false);
            if (res.status == 'error') {
                return toast({
                    title: `${res.code}`,
                    status: "error",
                    isClosable: true,
                });
            }
            setValue(res.articles);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const handleToggler = () => {
        setToggler(!toggler);
    };


    return (
        <Box width={'90%'} m='auto'>
            <Navbar />
            <Box m={['10% 0', '10% 0', '5% 0']} display={'flex'} justifyContent={'space-around'}>
                <Box>
                    <Input width={['100px', '100px', '200px']} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Yr Title' />
                    <Button onClick={getData}>{loading ? <Loading /> : "Search"}</Button>
                </Box>
                <Box display={'flex'} gap={'5px'} flexDirection={['column', 'column', 'row']}>
                    <Select width={'150px'} onChange={getData}>
                        <option value={''}>SORT BY</option>
                        <option value={'popularity'}>Popularity</option>
                        <option value={'publishedAt'}>PublishedAt</option>
                        <option value={'relevancy'}>Relevancy</option>
                    </Select>
                    <Button onClick={handleToggler}>Toggler</Button>
                </Box>
            </Box>
            {error && <Error />}

            {
                value.length === 0 ? <Heading color={'goldenrod'}>No Search Till Now 😊</Heading> :

                    <Box display={'grid'} gridTemplateColumns={[toggler ? 'repeat(2,1fr)' : 'repeat(1,1fr)', toggler ? 'repeat(2,1fr)' : 'repeat(1,1fr)', toggler ? 'repeat(2,1fr)' : 'repeat(3,1fr)']} gap={'20px'}>
                        {value && value.map(({ urlToImage, source, title, description, author, publishedAt, url
                        }, index) =>
                            <Box padding={'3px'} boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" borderRadius={'10px'} key={index
                            }>
                                <Img borderRadius={'5px'} mb='2%' w={'100%'} h='250px' src={urlToImage} alt={title} />
                                <Text mb='2%' lineHeight={'16px'}>Title: {title}</Text>
                                <Text mb='2%'>Author: {author}</Text>
                                <Text lineHeight={'16px'} mb='2%'>Description: {description}</Text>
                                <Text mb='2%'>PublishedAt: {publishedAt}</Text>
                                <Text fontSize={'23px'} color={'red'}><Link target='_blank' to={url}>MORE</Link></Text>
                            </Box>
                        )}
                    </Box>

            }

        </Box>
    );
}

export default Everything