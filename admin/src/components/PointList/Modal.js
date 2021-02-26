import React, { useState, useRef } from 'react';
import ReactLassoSelect from 'react-lasso-select';

import {
  Modal,
  ModalHeader,
  ModalFooter,
  ButtonModal,
  ModalBody as modalBody
} from 'strapi-helper-plugin';
import styled from 'styled-components';

const ModalBody = styled(modalBody)`
  .row {
    justify-content: center;
  }
`;

const pathToString = (arr) => arr.map(({x,y}) => `${x},${y}`).join(' ');
const pathFromString = (str) => str.split(' ').filter(Boolean).map(s => s.split(',').map(Number)).map(([x,y]) => ({x, y}));

export function LassoModal ({ isOpen, src, value, onConfirm, onDismiss, onToggle }) {
  const [lassoValue, setLassoValue] = useState([]);
  const lastValue = useRef(value);
  const wasOpen = useRef(isOpen);
  if (value !== lastValue.current || isOpen !== wasOpen.current) {
    wasOpen.current = isOpen;
    lastValue.current = value;
    setLassoValue(pathFromString(value));
  }
  return (
    <Modal isOpen={isOpen} onToggle={onToggle}>
      <ModalHeader
        onClickGoBack={onToggle}
        HeaderComponent={() => <p>Select path by clicking on image</p>}
      />
      <ModalBody style>
        <ReactLassoSelect
          imageStyle={{maxWidth: '100%'}}
          src={src}
          value={lassoValue}
          onChange={(path) => setLassoValue(path)}
        />
      </ModalBody>
      <ModalFooter>
        <section>
          <ButtonModal message="app.components.Button.cancel" isSecondary={true} onClick={() => {
            onToggle();
            onDismiss();
          }}/>
          <ButtonModal message="app.components.Button.save" isSecondary={false} onClick={() => {
            onToggle();
            onConfirm(pathToString(lassoValue));
          }}/>
        </section>
      </ModalFooter>
    </Modal>
  );
}

LassoModal.defaultProps = {
  onConfirm: () => {},
  onDismiss: () => {}
};
