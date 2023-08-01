import { Box, Button, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import EveryCard from './EveryCard';
import Loading from './Loading';
import Error from './Error';

var totalPages = 5;
const DefaultTopHeadlines = ({ toggler }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getData(page);
  }, [page])

  const getData = async (page = 1) => {
    try {
      let res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_apiKey}&pageSize=20&page=${page}`);
      res = await res.json();
      setLoading(false);
      if (res.status == 'error') {
        return toast({
          title: `${res.code}`,
          status: "warning",
          isClosable: true,
        });
      }
      setData(res.articles);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const handlePageChange = (val) => {
    const value = page + val;
    setPage(value);
  };


  return (
    <Box>
      {loading && <Loading />}
      {error && <Error />}

      <Box display={'grid'} gridTemplateColumns={[toggler ? 'repeat(2,1fr)' : 'repeat(1,1fr)', toggler ? 'repeat(2,1fr)' : 'repeat(1,1fr)', toggler ? 'repeat(2,1fr)' : 'repeat(3,1fr)']} gap={'20px'}>
        {
          data && data.map(({ urlToImage, title, description, author, publishedAt, url }, index) =>
            <EveryCard index={index} author={author} title={title} description={description} publishedAt={publishedAt} url={url} urlToImage={urlToImage} />
          )
        }
      </Box>

      <Box m='3% 0' display={'flex'} gap={'5px'} justifyContent={'center'} alignItems={'center'}>
        <Button variant={'outline'} isDisabled={page <= 1} onClick={() => handlePageChange(-1)}>PREV</Button>
        <Button variant={'outline'} isDisabled color={'red'}>{page}</Button>
        <Button isDisabled={page > totalPages} variant={'outline'} onClick={() => handlePageChange(+1)}>NEXT</Button>
      </Box>
    </Box>
  );
}

export default DefaultTopHeadlines;