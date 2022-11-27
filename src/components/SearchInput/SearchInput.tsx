//react
import React, { useState } from 'react';
//styles
import './SearchInput.scss'

const SearchInput: React.FC = () => {
  const [term, setTerm] = useState('')

  return (
    <div className="search-input">
      <input className="search-input__input"
             type="text"
             placeholder="Search"
             value={term}
             onChange={e => setTerm(e.target.value)} />
      <ul className="search-input__list">
      </ul>
    </div>
  );
};

export { SearchInput };
