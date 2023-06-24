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

    (async () => {
      const {
        data: { photos, total_results },
      } = await ImageService.getImages(query, page);

      setShowBtn(page < Math.ceil(total_results / 15));

      setImages(photos);
    })();
  }, [page, query]);

  const onSubmit = value => setQuery(value);

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {!images.length && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      <Grid>
        {images.map(({ alt, src: { medium }, id, avg_color }) => (
          <GridItem key={id}>
            <CardItem color={avg_color}>
              <img src={medium} alt={alt} />
            </CardItem>
          </GridItem>
        ))}
      </Grid>
      {showBtn && <Button>Load more</Button>}
    </>
  );
}
