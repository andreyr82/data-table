function DataTableCell({ item, column }) {

  function getFormatValue() {
    let value = item[column.field];

    switch (column.type) {
      case 'bool':
        return value ? 'Да' : 'Нет';
      case 'num':
      case 'text':
      default:
        return value;
    }
  }

  return (
    <td>
      {getFormatValue()}
    </td>
  )
}

export default DataTableCell;