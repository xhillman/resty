import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Results from './index';

describe('Results component', () => {
  it('renders the data passed in as expected', () => {
    let data = {key: 'value'};
    render(<Results data={data}/>);
    let pre = screen.getByTestId('results-pre');
    expect(pre).toHaveTextContent('value');
  })
})