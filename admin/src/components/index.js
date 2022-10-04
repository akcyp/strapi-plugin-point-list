import React, { useState, useEffect } from 'react';
import ReactLassoSelect from 'react-lasso-select';

import { useIntl } from 'react-intl';
import {
  useLibrary,
  prefixFileUrlWithBackendUrl,
} from '@strapi/helper-plugin';

import UnderlineIcon from '@strapi/icons/Underline';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { TextInput } from '@strapi/design-system/TextInput';
import { FieldAction } from '@strapi/design-system/Field';

import { Button } from '@strapi/design-system/Button';
import { Typography } from '@strapi/design-system/Typography';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';

const pathToString = (arr) => arr.map(({x,y}) => `${x},${y}`).join(' ');
const pathFromString = (str) => str.split(' ').filter(Boolean).map(s => s.split(',').map(Number)).map(([x,y]) => ({x, y}));

export default function PointList ({
  attribute,
  contentTypeUID,
  description,
  disabled,
  error,
  intlLabel,
  labelAction,
  multiple,
  name,
  onChange,
  options,
  placeholder,
  required,
  type,
  value,
  withDefaultValue,
}) {
  const { components } = useLibrary();
  const { formatMessage } = useIntl();

  const [media, setMedia] = useState('');
  const [points, setPoints] = useState([]);
  const [isMediaModalOpen, setMediaModalOpen] = useState(false);
  const [isLassoModalOpen, setLassoModalOpen] = useState(false);

  useEffect(() => {
    setPoints(value ? pathFromString(value) : []);
  }, [value]);

  const MediaModalComponent = components['media-library'];
  return (
    <div>
      <TextInput
        type="text"
        id={name}
        label={formatMessage(intlLabel)}
        name={name}
        value={value || ''}
        required={required}
        disabled={true}
        placeholder={placeholder && formatMessage(placeholder)}
        hint={description && formatMessage(description)}
        error={error}
        onChange={onChange}
        startAction={
          <Tooltip description="Interactive select">
            <FieldAction label="Interactive select" onClick={() => {
              if (!disabled) {
                setMediaModalOpen(true);
              }
            }}>
              <UnderlineIcon />
            </FieldAction>
          </Tooltip>
        }
      />
      { isMediaModalOpen && <MediaModalComponent
        allowedTypes={['images']}
        onClose={() => {
          setMediaModalOpen(false);
        }}
        onSelectAssets={(files) => {
          setMediaModalOpen(false);
          if (files.length) {
            setMedia(prefixFileUrlWithBackendUrl(files[0].url));
            setLassoModalOpen(true);
          }
        }}
      /> }
      { isLassoModalOpen && <ModalLayout onClose={() => setLassoModalOpen(false)} labelledBy="lasso_modal_title">
        <ModalHeader>
          <Typography fontWeight="bold" textColor="neutral800" as="h2" id="lasso_modal_title">
            Select path by clicking on image
          </Typography>
        </ModalHeader>
        <ModalBody>
          <ReactLassoSelect
            imageStyle={{maxWidth: '100%'}}
            src={media}
            value={points}
            onChange={(path) => setPoints(path)}
          />
        </ModalBody>
        <ModalFooter
          startActions={
            <Button onClick={() => {
              setPoints([]);
              setLassoModalOpen(false);
            }} variant="tertiary">Cancel</Button>
          }
          endActions={
            <>
              <Button onClick={() => setPoints([])} variant="danger-light">Reset</Button>
              <Button onClick={() => {
                setLassoModalOpen(false);
                onChange({
                  target: {
                    name,
                    type: 'string',
                    value: pathToString(points),
                  },
                });
              }}>Finish</Button>
            </>
          }
        />
      </ModalLayout> }
    </div>
  );
}
