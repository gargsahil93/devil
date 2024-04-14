import { TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export default function NumberInput({
  value,
  setValue,
  label,
  id,
  name,
}: {
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id?: string;
  name?: string;
}) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [localValue, setLocalValue] = useState(value);

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
    <TextField
      size="small"
      variant="standard"
      label={label}
      onChange={inputChanged}
      value={localValue}
      error={error}
      helperText={helperText}
      id={id}
      name={name}
    />
  );
}
