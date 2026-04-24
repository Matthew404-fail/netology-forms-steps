import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { StepsType } from '../Steps';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

export type TableRowHandlers = {
  handleEditButtonClick: (selectedItem: StepsType) => void;
  handleDeleteButtonClick: (selectedItem: StepsType) => void;
};

type TableRowProps = TableRowHandlers & {
  rowData: StepsType;
};

const TableRow = ({
  rowData,
  handleEditButtonClick,
  handleDeleteButtonClick,
}: TableRowProps) => {
  return (
    <div className="table-row">
      <span className="table-cell">{rowData.date}</span>
      <span className="table-cell">{rowData.distance}</span>
      <div className="table-cell">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleEditButtonClick(rowData);
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleDeleteButtonClick(rowData);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
};

export default TableRow;
