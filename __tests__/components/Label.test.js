import React from 'react';
import { render } from '@testing-library/react-native';

import Label from '@/components/Label';

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label />);
  });
});
