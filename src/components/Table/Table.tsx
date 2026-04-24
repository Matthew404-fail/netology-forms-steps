import type { StepsType } from '../Steps';
import TableRow, { type TableRowHandlers } from './TableRow';

type TableProps = TableRowHandlers & {
  tableData: StepsType[];
};

const Table = (props: TableProps) => {
  const { tableData, handleDeleteButtonClick, handleEditButtonClick } = props;

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <span className="header-cell">Дата (ДД.ММ.ГГГГ)</span>
        <span className="header-cell">Пройдено км</span>
        <span className="header-cell">Действия</span>
      </div>
      <div className="table-body">
        {tableData.map((item) => (
          <TableRow
            rowData={item}
            key={item.date}
            handleEditButtonClick={handleEditButtonClick}
            handleDeleteButtonClick={handleDeleteButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;
