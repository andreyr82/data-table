import { memo } from 'react';

const AmountSelect = memo(({ amount = 10, onChange }) => {
  return (
    <select
      className="form-select"
      value={amount}
      onChange={event => onChange(+event.target.value)}
    >
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  )
});

export default AmountSelect;