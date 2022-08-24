import { memo } from 'react';

const FilterSelect = memo(({ value='', filterValues, onChange }) => {
  return (
    <select className="form-select" value={value} onChange={event => onChange(event.target.value)}>
      <option value=''>---</option>
      {filterValues.map((filterValue) => 
        <option
          key={filterValue}
          value={filterValue}
        >
          {filterValue}
        </option>
      )}
    </select>
  )
});

export default FilterSelect;