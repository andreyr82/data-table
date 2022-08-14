import { useCallback, useEffect, useState } from 'react';
import DataTable from './components/DataTable/DataTable';
import { getPersons } from './services/person';

const columns = [
  {
    title: 'id',
    field: 'id',
    sortable: true,
    type: 'num',
  },
  {
    title: 'Name',
    field: 'name',
    sortable: true,
    filtrable: true,
    type: 'text',
  },
  {
    title: 'Second Name',
    field: 'secondName',
    sortable: true,
    filtrable: true,
    type: 'text',
  },
  {
    title: 'Merried',
    field: 'merried',
    sortable: true,
    type: 'bool',
  },
  {
    title: 'Medical Insurance',
    field: 'medicalInsurance',
    sortable: true,
    type: 'text',
  },
];

const defaultSort = {
  field: '',
  direction: 'asc'
};

function App() {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [filter, setFilter] = useState({});
  const [pagesCount, setPagesCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [sort, setSort] = useState(defaultSort);

  function getData() {
    setLoading(true);
    getPersons(page, amount, sort, searchText, filter, refresh)
      .then(result => {
        setData(result.data);
        setPagesCount(result.pagesCount);
        setFilterValues(result.filterValues);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const onChangeSort = useCallback((field) => {
    setSort((prevState) => {
      const direction = field === prevState.field && prevState.direction === 'asc' ? 'desc' : 'asc';

      return {
        field,
        direction,
      }
    })
  }, []);

  const onChangeFilter = useCallback((field, value) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        [field]: value,
      }
    })
  }, []);

  const onChangeAmount = useCallback((selectedAmount) => {
    setPage(1);
    setAmount(selectedAmount);
  }, []);

  const onChangePage = useCallback((selectedPage) => {
    setPage(selectedPage);
  }, []);

  const onChangeSearchText = useCallback((text) => {
    setPage(1);
    setSearchText(text);
  }, []);

  function onRefresh() {
    setRefresh(true);
    setPage(1);
    setSort({...defaultSort});
    setFilter({});
    setSearchText('');
  }

  useEffect(() => {
    getData();
  }, [page, sort, amount, searchText, filter, refresh]);

  return (
    <div className="row justify-content-md-center">
      <div className='col col-md-8'>
        <h1 className='text-center'>Data table component</h1>
        <DataTable
          amount={amount}
          columns={columns}
          data={data}
          filter={filter}
          filterValues={filterValues}
          loading={loading}
          page={page}
          sort={sort}
          pagesCount={pagesCount}
          onChangePage={onChangePage}
          onChangeSort={onChangeSort}
          onChangeAmount={onChangeAmount}
          onChangeSearchText={onChangeSearchText}
          onChangeFilter={onChangeFilter}
          onRefresh={onRefresh}
        ></DataTable>
      </div>
    </div>
  );
}

export default App;
