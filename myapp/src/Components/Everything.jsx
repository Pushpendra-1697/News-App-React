import { Box, Button, Input, useToast, Select } from '@chakra-ui/react';
import React, { useState } from 'react'
import Loading from './Loading';
import Error from './Error';
import Navbar from './Navbar';
import EveryCard from './EveryCard';
import DefaultEvery from './DefaultEvery';

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
            let res = await fetch(`https://newsapi.org/v2/everything?q=${title}&sortBy=${sort}&apiKey=${process.env.REACT_APP_apiKey}`);
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
                value.length === 0 ? <DefaultEvery toggler={toggler} /> :

                    <Box display={'grid'} gridTemplateColumns={[toggler ? 'repeat(2,1fr)' : 'repeat(1,1fr)', toggler ? 'repeat(2,1fr)' : 'repeat(1,1fr)', toggler ? 'repeat(2,1fr)' : 'repeat(3,1fr)']} gap={'20px'}>
                        {value && value.map(({ urlToImage, title, description, author, publishedAt, url
                        }, index) =>
                            <EveryCard index={index} author={author} title={title} description={description} publishedAt={publishedAt} url={url} urlToImage={urlToImage} />
                        )}
                    </Box>
            }
        </Box>
    );
}

export default Everything