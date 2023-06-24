import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      return alert('Enter a query');
    }

    onSubmit(query.trim());
  };

  return (
    <>
      <SearchFormStyled onSubmit={handleSubmit}>
        <InputSearch
          value={query}
          onChange={e => setQuery(e.target.value.toLowerCase())}
        />
        <FormBtn>
          <FiSearch />
        </FormBtn>
      </SearchFormStyled>
    </>
  );
}
