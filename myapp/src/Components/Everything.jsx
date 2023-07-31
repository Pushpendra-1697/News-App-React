import { Box, Button, Heading, Text, Img, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import Loading from './Loading';
import { Link } from 'react-router-dom';

const Everything = () => {
    const [value, setValue] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const toast = useToast();
    const [toggler, setToggler] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            let res = await fetch(`https://newsapi.org/v2/everything?q=${title}&apiKey=b3ec9c97fea04373914caf3c7dbe5604`);
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

    console.log(value);

    return (
        <Box width={'90%'} m='auto'>
            <Box mb='5%' display={'flex'} justifyContent={'space-around'}>
                <Box>
                    <Input width={'200px'} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Yr Title' />
                    <Button onClick={getData}>{loading ? <Loading /> : "Search"}</Button>
                </Box>
                <Button onClick={handleToggler}>Toggler</Button>
            </Box>

            {
                value.length == 0 ? <Heading>No Search Till Now</Heading> :

                    <Box display={'grid'} gridTemplateColumns={toggler ? 'repeat(2,1fr)' : 'repeat(3,1fr)'} gap={'20px'}>
                        {value && value.map(({ urlToImage, source, title, description, author, publishedAt, url
                        }) =>
                            <Box padding={'3px'} boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" borderRadius={'10px'} key={source.id
                            }>
                                <Img borderRadius={'5px'} mb='2%' w={'100%'} h='250px' src={urlToImage} alt={title} />
                                <Text mb='2%' lineHeight={'16px'}>Title: {title}</Text>
                                <Text mb='2%'>Author: {author}</Text>
                                <Text lineHeight={'16px'} mb='2%'>Description: {description}</Text>
                                <Text mb='2%'>PublishedAt: {publishedAt}</Text>
                                <Text fontSize={'23px'} color={'red'}><Link to={url}>MORE</Link></Text>
                            </Box>
                        )}
                    </Box>

            }


        </Box>
    );
}

export default Everything