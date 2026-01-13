import React from 'react';
import { Label } from '../../types/label';
import { NumericKeys } from '../../types/NumericKeys';

type Props = {
  labelValue: Label;
  type: string;
  name: NumericKeys;
  value?: number;
  checked?: boolean;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  labelValue,
  type,
  name,
  handleOnChange,
  value,
  checked,
}) => {
  return (
    <label>
      {labelValue}
      <input
        type={type}
        min={0}
        name={name}
        onChange={handleOnChange}
        value={value}
        checked={checked}
      />
    </label>
  );
};
