import { TextField, TextFieldProps } from '@mui/material';
import { KeyboardEventHandler, ReactNode, useState } from 'react';

import './smartTextField.scss';

export default function SmartTextField({
  zeroValue = '0',
  ...props
}: TextFieldProps & { zeroValue?: string }) {
  const [edit, setEdit] = useState(false);

  return !edit ? (
    <span
      className="editableValue"
      //   onClick={() => setEdit(true)}
      tabIndex={0}
      onFocus={() => setEdit(true)}
    >
      {(props.value || zeroValue) as ReactNode}
    </span>
  ) : (
    <TextField
      {...props}
      onBlur={() => setEdit(false)}
      onKeyDown={(e) => {
        if (['Enter', 'Escape'].includes(e.key)) {
          setEdit(false);
        }
      }}
      autoFocus
    />
  );
}
