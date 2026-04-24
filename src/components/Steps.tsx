import { useState } from 'react';
import EditForm from './EditForm';
import Table from './Table/Table';

export type StepsType = {
  date: string;
  distance: number;
};

const Steps = () => {
  const [tableData, setTableData] = useState<StepsType[]>([]);
  const [editItem, setEditItem] = useState<StepsType | null>(null);

  const handleEditButtonClick = (selectedItem: StepsType) => {
    setEditItem(selectedItem);
  };

  const handleDeleteButtonClick = (selectedItem: StepsType) => {
    setTableData((prevData) =>
      prevData.filter((item) => item.date !== selectedItem.date)
    );
    if (editItem?.date === selectedItem.date) {
      setEditItem(null);
    }
  };

  const handleSubmit = (submittedItem: StepsType, isEditing: boolean) => {
    const existedItem = tableData.find((el) => el.date === submittedItem.date);

    if (existedItem) {
      setTableData((prev) =>
        prev.map((el): StepsType => {
          if (el.date === existedItem.date) {
            return {
              date: existedItem.date,
              distance: isEditing
                ? submittedItem.distance
                : existedItem.distance + submittedItem.distance,
            };
          }

          return el;
        })
      );
    } else {
      const tempData = [...tableData, submittedItem].sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('.').map(Number);
        const [dayB, monthB, yearB] = b.date.split('.').map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateB.getTime() - dateA.getTime();
      });

      setTableData(tempData);
    }

    if (isEditing) {
      setEditItem(null);
    }
  };

  return (
    <div className="content-wrapper">
      <EditForm selectedItem={editItem} handleSubmit={handleSubmit} />
      <Table
        tableData={tableData}
        handleEditButtonClick={handleEditButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </div>
  );
};

export default Steps;
