import DataTableHeader from "./DataTableHeader";
import DataTableHeaderCell from "./DataTableHeaderCell";
import DataTableRow from "./DataTableRow";
import DataTableCell from "./DataTableCell";
import Pagination from "./Pagination";
import AmountSelect from "./AmountSelect";
import SearchField from "./SeachField";
import FilterSelect from "./FilterSelect";
import Spinner from "./Spinner";
import './data-table.css';

const SORT_ARROWS = {
  asc: '↑',
  desc: '↓'
};

function DataTable({ amount, columns, data, filter, filterValues, loading, sort, page, pagesCount, onChangeSort, onChangePage, onChangeAmount, onChangeSearchText, onChangeFilter, onRefresh }) {
  return (
    <div className="data-table">
      <div className="row justify-content-between">
        <div className="col">
          <SearchField 
            onChangeSearchText={onChangeSearchText}
          />
        </div>
        <div className="col-auto">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onRefresh}
          >
            Refresh
          </button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <DataTableHeader>
            {columns.map(column => 
              <DataTableHeaderCell key={column.field}>
                <div
                  role="button"
                  onClick={event => onChangeSort(column.field)}
                >
                  {column.title} {sort.field === column.field ? SORT_ARROWS[sort.direction] : ''}
                </div>
                {filterValues[column.field]?.length ? (
                    <FilterSelect
                      value={filter[column.field]}
                      filterValues={filterValues[column.field]}
                      onChange={value => onChangeFilter(column.field, value)}
                    />
                  ) : ''
                }
              </DataTableHeaderCell>
            )}
          </DataTableHeader>
        </thead>
        <tbody>
          {data && data.map(item => 
            <DataTableRow key={item.id}>
              {columns.map(column =>
                <DataTableCell 
                  key={`${item.id}${column.field}`} 
                  column={column}
                  item={item}
                />
              )}
            </DataTableRow>
          )}
        </tbody>
      </table>
      <div className="row justify-content-between">
        <div className="col">
          <Pagination
            page={page}
            pagesCount={pagesCount}
            onChangePage={onChangePage}
          />
        </div>
        <div className="col">
          <AmountSelect 
            amount={amount}
            onChange={onChangeAmount}
          />
        </div>
      </div>
      {loading ? <Spinner /> : null}
    </div>
  );
}

export default DataTable;