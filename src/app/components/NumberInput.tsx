import { TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import SmartTextField from './SmartTextField';

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
  const [edit, setEdit] = useState(false);

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
    />
  );

  // return !edit ? (
  //   <span onClick={() => setEdit(true)}>{value || 0}</span>
  // ) : (
  //   <TextField
  //     size="small"
  //     variant="standard"
  //     label={label}
  //     onChange={inputChanged}
  //     value={localValue}
  //     error={error}
  //     helperText={helperText}
  //     id={id}
  //     name={name}
  //     onBlur={() => setEdit(false)}
  //   />
  // );
}
