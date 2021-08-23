import { useState } from 'react';
import styles from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');
  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    reset();
  };
  const reset = () => {
    setSearch('');
  };
  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          type="text"
          value={search}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
