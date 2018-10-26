import React from 'react';

const SearchField = ({name, placeholder, value, onChange}) => (
    <input type='text'
           name={name}
           className='search-field'
           placeholder={placeholder}
           value={value}
           onChange={onChange}/>
);
export default SearchField;
