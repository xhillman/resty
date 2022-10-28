import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from './components/history';

const initialState = {
  data: {},
  requestParams: {},
  loading: false,
  history: [],
  rerender: {
    active: false,
    pointer: undefined,
  },
}

const appReducer = (state, action) => {
  switch(action.type) {
    case 'data':
      let historyPointer = state.history.length - 1;
      state.history[historyPointer].data = action.payload;
      return {...state, data: action.payload};
    case 'requestParams':
      return {...state, requestParams: action.payload, history: [...state.history, action.payload]};
    case 'loading':
      return {...state, loading: action.payload};
    case 'rerender':
      return {...state, rerender: {active: action.payload.active, pointer: action.payload.pointer}}
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
        appDispatch({type: 'rerender', payload: {active: false, pointer: undefined}})
      } catch (error) {
        console.log(error);
      }
    }
    hitApi();
  }, [state.requestParams]);

  // useEffect(() => {
  //   appDispatch({type: 'update', payload: state.data})
  // }, [state.data])

  const renderHistory = (index) => {
    appDispatch({type: 'rerender', payload: {active: true, pointer: index}})
  }
  
  // useEffect(() => {
  //   appDispatch({type: 'data', payload: state.rerender});
  // }, [state.rerender])

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <History history={state.history} rerender={renderHistory}/>
      <Form handleApiCall={callApi} />
      <Results data={state.data} 
              loading={state.loading} 
              history={state.history} 
              rerender={state.rerender}/>
      <Footer />
    </React.Fragment>
  );
}

export default App;
