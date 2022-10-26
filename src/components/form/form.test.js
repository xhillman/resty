import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';

import Form from './index';

describe('Form component', () => {
  it('calls the handleApiCall function', () => {
    let handleApiCall = jest.fn();
    render(<Form handleApiCall={handleApiCall}/>)
    let button = screen.getByTestId('go-button');
    fireEvent.click(button);
    expect(handleApiCall).toHaveBeenCalled();
  })
})