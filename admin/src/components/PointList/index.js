import React, { useState, useCallback } from 'react';
import {
  useStrapi,
  prefixFileUrlWithBackendUrl,
} from 'strapi-helper-plugin';
import { Input } from './Input';
import { LassoModal } from './Modal';

export default function PointList ({ autoFocus, inputDescription, disabled, error, name, label, value, placeholder, onBlur, onChange }) {
  const { strapi } = useStrapi();
  const [media, setMedia] = useState('');
  const [isMediaModalOpen, setMediaModalOpen] = useState(false);
  const [isLassoModalOpen, setLassoModalOpen] = useState(false);

  const MediaModalComponent = strapi.componentApi.getComponent('media-library').Component;
  return (
    <div>
      <Input
        name={name}
        label={label}
        inputDescription={inputDescription}
        error={error}
        autoFocus={autoFocus}
        disabled={true}
        placeholder={placeholder}
        onBlur={onBlur}
        validations={{
          regex: /^(((\d+,\d+) )*(\d+,\d+))$|^$/
        }}
        value={value || ''}
        onClick={() => {
          if (media) setLassoModalOpen(true);
          else setMediaModalOpen(true);
        }}
      />
      <MediaModalComponent
        allowedTypes={['images']}
        isOpen={isMediaModalOpen}
        multiple={false}
        noNavigation
        onClosed={() => {
          if (media) {
            setLassoModalOpen(true);
          }
        }}
        onInputMediaChange={(value) => {
          if (value) setMedia(prefixFileUrlWithBackendUrl(value.url));
        }}
        onToggle={() => setMediaModalOpen(!isMediaModalOpen)}
      />
      <LassoModal
        isOpen={isLassoModalOpen}
        onToggle={() => {
          setMedia('');
          setLassoModalOpen(!isLassoModalOpen)
        }}
        src={media}
        value={value || ''}
        onConfirm={(value) => {
          onChange({target: { value, name, type: 'text' }});
        }}
      />
    </div>
  );
}