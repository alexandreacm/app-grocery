import React from 'react';
import { render } from '@testing-library/react-native';

import Modal from '@/components/Modal';

describe('Modal', () => {
  it('renders correctly with just comfirm button', () => {
    render(
      <Modal
        visible
        title='hi'
        confirm={() => {}}
        description='are you ok?'
        justConfirmButton
      />
    );
  });
  it('should render with two action options', () => {
    render(
      <Modal visible confirm={() => {}} title='hi' description='are you ok?' />
    );
  });
});
