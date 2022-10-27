import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {

  const [data, setData] = useState({});
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);

  const callApi = async (requestParams) => {
    setLoading(true);
    let {method, url, body} = requestParams;
    let request = {
      method,
      url,
    }
    if(body){
      request.body = body;
    }
    setRequestParams(request);
  }

  useEffect(() => {
    // let method = requestParams.method;
    // let url = requestParams.url;
    const hitApi = async () => {
      try {
        let newData = await axios(requestParams);
        setLoading(false);
        setData(newData);
      } catch (error) {
        console.log(error);
      }
    }
    hitApi();
  }, [requestParams]);

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} loading={loading}/>
      <Footer />
    </React.Fragment>
  );
}

export default App;
