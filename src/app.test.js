import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {rest} from 'msw';
import { setupServer } from 'msw/node';

import App from './App';

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App useEffect hook', () => {
  it('should make an api call when requestParams are made', async () => {
    render(<App/>);
    let button = screen.getByTestId('go-button');
    fireEvent.click(button);
    let hitApi = jest.fn()
    await waitFor(() => {
      hitApi();
    })
    expect(hitApi).toHaveBeenCalled();
  })
})