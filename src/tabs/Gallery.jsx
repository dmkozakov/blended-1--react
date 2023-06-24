import { Component, useEffect, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export function Gallery() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    ImageService.getImages(query, page);
  }, [page, query]);

  const onSubmit = value => setQuery(value);;
  
  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      <Grid>
        {images.map(image => (
          <GridItem key={image.id}>
            <CardItem />
          </GridItem>
        ))}
      </Grid>
      <Button>Load more</Button>
    </>
  );
}
