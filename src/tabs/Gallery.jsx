import { Component, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { Loader } from './Loader';
import { normalizeImages } from 'helpers';

export function Gallery() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    (async () => {
      try {
        setIsLoading(true);

        const {
          data: { photos, total_results },
        } = await ImageService.getImages(query, page);

        setShowBtn(page < Math.ceil(total_results / 15));

        if (!photos.length) {
          toast.error(`Not found 404`);
          return;
        }

        if (page === 1) {
          toast.success(`You can max load ${total_results}`);
        }

        const normalizedImages = normalizeImages(photos);

        setImages(prev => [...prev, ...normalizedImages]);
      } catch (error) {
        toast.error('Error');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, query]);

  const onSubmit = value => {
    setPage(1);
    setImages([]);
    setQuery(value);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {!images.length && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      <Grid>
        {images.map(({ alt, medium, id, avg_color }) => (
          <GridItem key={id}>
            <CardItem color={avg_color}>
              <img src={medium} alt={alt} />
            </CardItem>
          </GridItem>
        ))}
      </Grid>
      {showBtn && !isLoading && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      {isLoading && <Loader />}
    </>
  );
}
