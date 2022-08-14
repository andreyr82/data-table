import { useState, memo } from "react";

const SearchField = memo(({ onChangeSearchText }) => {
  const [searchText, setSearchText] = useState('');

  function onChangeText(event) {
    setSearchText(event.target.value);
  }

  function onClickClear() {
    setSearchText('');
    onChangeSearchText('');
  }

  function onSubmit(event) {
    event.preventDefault();
    onChangeSearchText(searchText);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control" 
          placeholder="Search text"
          value={searchText}
          onChange={onChangeText}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
        >
          Find
        </button>
        <button 
          className="btn btn-outline-secondary"
          type="button"
          onClick={onClickClear}
        >
          Clear
        </button>
      </div>
    </form>
  )
})

export default SearchField;