import { useEffect, useMemo, useState } from 'react';
import type { StepsType } from './Steps';

type StepsEditType = {
  date: string | null;
  distance: string | null;
};

const DEFAULT_EDIT_STEPS_ITEM: StepsEditType = {
  date: null,
  distance: null,
};

const isDateValid = (date: string) => {
  return /^[0-3][0-9]\.[0-1][0-9]\.[0-9][0-9][0-9][0-9]$/i.test(date);
};

type EditFormProps = {
  selectedItem: StepsType | null;
  handleSubmit: (item: StepsType, isEditing: boolean) => void;
};

const EditForm = ({ selectedItem, handleSubmit }: EditFormProps) => {
  const [form, setForm] = useState<StepsEditType>(DEFAULT_EDIT_STEPS_ITEM);

  useEffect(() => {
    if (selectedItem) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        date: selectedItem.date,
        distance: selectedItem.distance.toString(),
      });
    } else {
      setForm(DEFAULT_EDIT_STEPS_ITEM);
    }
  }, [selectedItem]);

  const isFormDataValid = useMemo((): boolean => {
    if (form.date === null || form.distance === null) {
      return false;
    }

    if (!isDateValid(form.date)) {
      return false;
    }

    return true;
  }, [form.date, form.distance]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    let formValue = value;

    if (name === 'distance') {
      formValue = value.replaceAll(',', '.');
      if (!/^\d*\.?\d*$/.test(formValue)) {
        return;
      }
    }

    if (name === 'date' && value.length > 10) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: formValue,
    }));
  };

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormDataValid) {
      return;
    }

    if (form.date && form.distance !== null) {
      handleSubmit(
        { date: form.date, distance: +form.distance },
        !!selectedItem
      );
    }
    setForm(DEFAULT_EDIT_STEPS_ITEM);
  };

  return (
    <form onSubmit={onSubmit} className="edit-form">
      <label htmlFor="date">
        Дата (ДД.ММ.ГГГГ)
        <input
          id="date"
          name="date"
          type="text"
          placeholder="дд.мм.гггг"
          readOnly={!!selectedItem}
          value={form.date ?? ''}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="distance">
        Пройдено км
        <input
          id="distance"
          name="distance"
          type="string"
          value={form.distance ?? ''}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit" disabled={!isFormDataValid}>
        OK
      </button>
    </form>
  );
};

export default EditForm;
