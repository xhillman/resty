import React, { useState } from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);

  const updateData = (data) => {
    setData(data);
  }

  const updateParams = (params) => {
    setRequestParams(params);
  }

  const callApi = (requestParams) => {
    setLoading(true);
    // mock output
    setTimeout(() => {
      const newData = {
        count: 2,
        results: [
          { name: 'fake thing 1', url: 'http://fakethings.com/1' },
          { name: 'fake thing 2', url: 'http://fakethings.com/2' },
        ],
      };
      updateData(newData);
      updateParams(requestParams);
      setLoading(false);
    }, 2000);
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <div className={loading ? 'spinner' : null}></div>
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
