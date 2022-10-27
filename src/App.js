import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

const initialState = {
  data: {},
  requestParams: {},
  loading: false,
  history: []
}

const appReducer = (state, action) => {
  switch(action.type) {
    case 'data':
      return {...state, data: action.payload};
    case 'requestParams':
      return {...state, requestParams: action.payload, history: [...state.history, action.payload]};
    case 'loading':
      return {...state, loading: action.payload};
    default:
      return state;
  }
}

function App() {

  const [state, appDispatch] = useReducer(appReducer, initialState);

  const callApi = async (requestParams) => {
    appDispatch({type: 'loading', payload: true});
    let {method, url, body} = requestParams;
    let request = {
      method,
      url,
    } 
    if(body){
      request.body = body;
    }
    appDispatch({type: 'requestParams', payload: request});
  }

  useEffect(() => {
    const hitApi = async () => {
      try {
        let newData = await axios(state.requestParams);
        appDispatch({type: 'loading', payload: false});
        appDispatch({type: 'data', payload: newData})
      } catch (error) {
        console.log(error);
      }
    }
    hitApi();
  }, [state.requestParams]);

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={state.data} loading={state.loading}/>
      <Footer />
    </React.Fragment>
  );
}

export default App;
