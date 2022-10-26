import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';

import App from '../App';

describe('data rendering functionality', () => {
  it('renders data to the output section upon form submission', () => {
    render(<App />);
    const button = screen.getByTestId('go-button');
    const output = screen.getByTestId('output-area');
    fireEvent.click(button);
    expect(output).toHaveTextContent('count');
  })
})
