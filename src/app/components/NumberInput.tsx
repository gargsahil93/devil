import { TextField } from '@mui/material';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import SmartTextField from './SmartTextField';

export default function NumberInput({
  value,
  setValue,
  label,
  id,
  name,
  onlyEdit,
}: {
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id?: string;
  name?: string;
  onlyEdit?: boolean;
}) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const inputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isNaN(+val)) {
      setHelperText('Please only enter numeric value');
      setError(true);
    } else {
      setHelperText('');
      setError(false);
      setValue(e);
    }
    setLocalValue(val);
  };

  return (
    <SmartTextField
      size="small"
      variant="standard"
      label={label}
      onChange={inputChanged}
      value={localValue}
      error={error}
      helperText={helperText}
      id={id}
      name={name}
      onlyEdit={onlyEdit}
    />
  );
}
