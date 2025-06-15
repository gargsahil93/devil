import { TextField, TextFieldProps } from '@mui/material';
import { KeyboardEventHandler, ReactNode, useState } from 'react';

import './smartTextField.scss';

export default function SmartTextField({
  zeroValue = '0',
  onlyEdit = false,
  ...props
}: TextFieldProps & { zeroValue?: string; onlyEdit?: boolean }) {
  const [edit, setEdit] = useState(onlyEdit);

  return !edit ? (
    <span className="editableValue" tabIndex={0} onFocus={() => setEdit(true)}>
      {(props.value || zeroValue) as ReactNode}
    </span>
  ) : (
    <TextField
      {...props}
      onBlur={() => setEdit(onlyEdit)}
      onKeyDown={(e) => {
        if (['Enter', 'Escape'].includes(e.key)) {
          setEdit(onlyEdit);
        }
      }}
      autoFocus
    />
  );
}
