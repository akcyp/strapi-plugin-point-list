import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputWrapper = styled.div`
  min-width: 200px;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const InputGroupWrapper = styled.div`
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: stretch;
  align-items: stretch;
  width: 100%;
  min-width: 200px;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  input {
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    margin-bottom: 0;
  }
`;

const InputButton = styled.span`
  min-width: 5.9rem;
  height: 3.4rem;
  margin-top: 0.9rem;
  background-color: rgba(16,22,34,0.02);
  border: 1px solid #e3e9f3;
  border-left: 0;
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: rgba(16,22,34,0.5);
  line-height: 3.2rem;
  font-size: 1.3rem;
  font-family: 'Lato';
  font-weight: 600 !important;
  -moz-appearance: none;
  -webkit-appearance: none;
  text-align: center;
  cursor: pointer;
`;

import {
  validateInput,
  Label,
  InputText,
  InputDescription,
  InputErrors,
  InputSpacer
} from 'strapi-helper-plugin';

export function Input ({ name, label, disabled, autoFocus, onChange, onBlur, onFocus, placeholder, value, inputDescription, validations, onClick, error }) {
  const [errors, setErrors] = useState([]);
  const getErrors = useCallback(() => errors.concat(error || []), [error]);
  const handleBlur = useCallback(({ target }) => {
    setErrors(validateInput(target.value, validations));
    if (onBlur instanceof Function) onBlur();
  }, [onBlur]);
  return (
    <InputWrapper className="col-md-12">
      <Label
        htmlFor={name}
        message={label}
      />
      <InputGroupWrapper>
        <InputText
          autoFocus={autoFocus}
          disabled={disabled}
          error={!!getErrors().length}
          name={name}
          onBlur={handleBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          tabIndex="0"
          value={value}
        />
        <InputButton onClick={onClick}>
          <i className="fa fa-map-marked-alt" role="button" aria-hidden="true" />
        </InputButton>
      </InputGroupWrapper>
      <InputDescription
        message={inputDescription}
      />
      <InputErrors
        errors={getErrors()}
        name={name}
      />
      <InputSpacer />
    </InputWrapper>
  );
}

Input.defaultProps = {
  disabled: false,
  autoFocus: false,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  placeholder: 'app.utils.placeholder.defaultMessage',
  inputDescription: '',
  validations: {},
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

