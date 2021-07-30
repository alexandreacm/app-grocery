import React from 'react';
import { render } from '@testing-library/react-native';

import Button from '@/components/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button />);
  });

  it('should render with activity indicator', () => {
    render(<Button isLoading />);
  });
});
