import { Icon } from '@rsuite/icons';
import React, { useState } from 'react';
import { Input, InputGroup } from 'rsuite';
import { useCallback } from 'react';
// import { MdClose } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { FcCheckmark } from 'react-icons/fc';
const EditableInput = ({
  initialValue,
  label,
  onSave,
  nickname = null,
  placeholder = 'enter your name',
  emptyMessage = 'input is empty',
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();
    if (trimmed === '') {
      await onSave(trimmed);
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }
    setIsEditable(false);
  };

  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          value={input}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon as={isEditable ? AiOutlineClose : BiEditAlt} size="2em" />
        </InputGroup.Button>

        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon as={FcCheckmark} size="2em" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
