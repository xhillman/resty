import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Results from './index';

describe('Results component', () => {
  it('renders the data passed in as expected', () => {
    let data = {data: 'data', headers: 'headers'};
    render(<Results data={data}/>);
    let jsonPretty1 = screen.getByTestId('jsonPretty1');
    let jsonPretty2 = screen.getByTestId('jsonPretty2');
    expect(jsonPretty1).toHaveTextContent('headers');
    expect(jsonPretty2).toHaveTextContent('data');
  })
})