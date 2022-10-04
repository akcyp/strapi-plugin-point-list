import React, { useState, useEffect } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';
import ReactLassoSelect from 'react-lasso-select';
import {
  useLibrary,
  prefixFileUrlWithBackendUrl,
} from '@strapi/helper-plugin';
import { pathConverter } from '../../utils/pathConverter';

import FieldIcon from '@strapi/icons/Crop';
import { Icon } from '@strapi/design-system/Icon';
import { Flex } from '@strapi/design-system/Flex';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { TextInput } from '@strapi/design-system/TextInput';
import { FieldAction } from '@strapi/design-system/Field';
import { Button } from '@strapi/design-system/Button';
import { Typography } from '@strapi/design-system/Typography';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';

type MediaModalComponent = React.FC<{
  multiple: boolean;
  allowedTypes: string[];
  onClose(): void;
  onSelectAssets(files: { url: string }[]): void;
}>;

const PointListInput: React.FunctionComponent<{
  attribute: {
    type: string;
    required: boolean;
    customField: string;
  };
  options: { metadatas: any }[];
  description: null | MessageDescriptor;
  intlLabel: null | MessageDescriptor;
  placeholder: null | MessageDescriptor;
  contentTypeUID: string;
  withDefaultValue: false;
  multiple: boolean;
  name: string;
  type: string;
  value: string;
  required: boolean;
  disabled: boolean;
  error: null; // ?
  onChange(e: {target: { name: string, value: string, type: string }}, shouldSetInitialValue?: boolean): void;
}> = ({
  value = '',
  intlLabel,
  name,
  required,
  placeholder,
  description,
  error,
  onChange,
  disabled,
}) => {
  const { components } = useLibrary();
  const { formatMessage } = useIntl();

  const [media, setMedia] = useState('');
  const [points, setPoints] = useState([] as { x: number, y: number }[]);
  const [isMediaModalOpen, setMediaModalOpen] = useState(false);
  const [isLassoModalOpen, setLassoModalOpen] = useState(false);

  useEffect(() => {
    setPoints(value ? pathConverter.fromString(value) : []);
  }, [value]);

  const MediaModalComponent = components['media-library'] as MediaModalComponent;
  const TEXTS = {
    Finish: formatMessage({
      id: 'global.finish',
      defaultMessage: 'Finish',
    }),
    Cancel: formatMessage({
      id: 'global.cancel',
      defaultMessage: 'Cancel',
    }),
    Reset: formatMessage({
      id: 'app.components.Button.reset',
      defaultMessage: 'Reset',
    }),
    Tutorial: formatMessage({
      id: 'point-list.point-list.tutorial',
      defaultMessage: 'Select path',
    }),
  };
  return <>
    <TextInput
      type="text"
      label={intlLabel && formatMessage(intlLabel)}
      placeholder={placeholder && formatMessage(placeholder)}
      hint={description && formatMessage(description)}
      disabled={true}
      onChange={onChange}
      id={name}
      name={name}
      value={value || ''}
      required={required}
      error={error}
      startAction={
        <Tooltip description="Interactive select">
          <FieldAction label="Interactive select" onClick={() => {
            if (!disabled) {
              setMediaModalOpen(true);
            }
          }}>
            <Flex justifyContent="center" alignItems="center" width={5} height={5} hasRadius aria-hidden>
              <Icon as={FieldIcon} />
            </Flex>
          </FieldAction>
        </Tooltip>
      }
    />
    { isMediaModalOpen && <>
      <MediaModalComponent
        multiple={false}
        allowedTypes={['images']}
        onClose={() => {
          setMediaModalOpen(false);
        }}
        onSelectAssets={files => {
          setMediaModalOpen(false);
          if (files.length) {
            setMedia(prefixFileUrlWithBackendUrl(files[0].url));
            setLassoModalOpen(true);
          }
        }}
      />
    </> }
    { isLassoModalOpen && <>
      <ModalLayout onClose={() => setLassoModalOpen(false)} labelledBy="lasso_modal_title">
        <ModalHeader>
          <Typography fontWeight="bold" textColor="neutral800" as="h2" id="lasso_modal_title">
            { TEXTS.Tutorial }
          </Typography>
        </ModalHeader>
        <ModalBody>
          <ReactLassoSelect
            imageStyle={{maxWidth: '100%'}}
            src={media}
            value={points}
            onChange={path => setPoints(path)}
          />
        </ModalBody>
        <ModalFooter
          startActions={
            <Button onClick={() => {
              setPoints([]);
              setLassoModalOpen(false);
            }} variant="tertiary">
              { TEXTS.Cancel }
            </Button>
          }
          endActions={
            <>
              <Button onClick={() => setPoints([])} variant="danger-light">
                { TEXTS.Reset }
              </Button>
              <Button onClick={() => {
                setLassoModalOpen(false);
                onChange({
                  target: {
                    name,
                    type: 'string',
                    value: pathConverter.toString(points),
                  },
                });
              }}>
                { TEXTS.Finish }
              </Button>
            </>
          }
        />
      </ModalLayout>
    </> }
  </>;
};

export default PointListInput;
