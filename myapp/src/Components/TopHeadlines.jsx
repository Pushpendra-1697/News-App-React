import { Box, Button, Heading, Text, Img, useToast, Select } from '@chakra-ui/react';
import React, { useState } from 'react'
import Loading from './Loading';
import { Link } from 'react-router-dom';
import Error from './Error';
import Navbar from './Navbar';

const TopHeadlines = () => {
    const [value, setValue] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const toast = useToast();
    const [toggler, setToggler] = useState(false);


    const getData = async (country = 'in', category = "general") => {
        try {
            setLoading(true);
            let res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&${process.env.REACT_APP_apiKey}`);
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

    const handleCountry = (e) => {
        getData(e.target.value);
    };

    const handleCategory = (e) => {
        getData('in', e.target.value)
    };

    return (
        <Box width={'90%'} m='auto'>
            <Navbar />
            <Box m={['10% 0', '10% 0', '5% 0']} display={'flex'} justifyContent={'space-evenly'} flexDirection={['column', 'column', 'row']}>
                <Select mb='1%' onChange={handleCountry} width={['', '', '200px']}>
                    <option value={''}>Filter BY Country</option>
                    <option value={'ae'}>United Arab Emirates</option>
                    <option value={'at'}>Austria</option>
                    <option value={'in'}>India</option>
                    <option value={'nz'}>New Zealand</option>
                    <option value={'ru'}>Russian</option>
                    <option value={'cn'}>China</option>
                    <option value={'jp'}>Japan</option>
                    <option value={'us'}>United States of America</option>
                    <option value={'ua'}>Ukraine</option>
                </Select>
                <Select mb='1%' width={['', '', '200px']} onChange={handleCategory}>
                    <option value={''}>Filter BY Category</option>
                    <option value={'business'}>business</option>
                    <option value={'entertainment'}>entertainment</option>
                    <option value={'general'}>general</option>
                    <option value={'health'}>health</option>
                    <option value={'science'}>science</option>
                    <option value={'sports'}>sports</option>
                    <option value={'technology'}>technology</option>
                </Select>
                <Button onClick={handleToggler}>Toggler</Button>
            </Box>

            {loading && <Loading />}
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

export default TopHeadlines