import { useReducer } from 'react';
import './form.scss';

const initialState = {
  url: '',
  method: '',
  isActive: false,
  request: null
}

const formReducer = (state, action) => {
  switch(action.type) {
    case 'url':
      return {...state, url: action.payload};
    case 'method':
      return {...state, method: action.payload};
    case 'isActive':
      return {...state, isActive: action.payload};
    case 'request':
      return {...state, request: action.payload};
    default:
      return state;
  }
}

const Form = (props) => {

  const [state, formDispatch] = useReducer(formReducer, initialState);

  const updateUrl = (e) => {
    formDispatch({type: 'url', payload: e.target.value});
  }

  const updateMethod = (e) => {
    formDispatch({type: 'method', payload: e.target.id});
    formDispatch({type: 'isActive', payload: true});
  }

  const updateRequest = (e) => {
    formDispatch({type: 'request', payload: e.target.value});
  }

  let handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method: state.method,
      url: state.url,
      body: state.request,
    };
    props.handleApiCall(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' onChange={updateUrl}/>
          <button data-testid='go-button' type="submit">GO!</button>
        </label>
        <label className="methods">
          <span id="get" onClick={updateMethod} style={{backgroundColor: state.isActive && state.method === 'get' ? 'lightgreen' : '#ccc',}}>GET</span>
          <span id="post" onClick={updateMethod} style={{backgroundColor: state.isActive && state.method === 'post' ? 'lightgreen' : '#ccc',}}>POST</span>
          <span id="put" onClick={updateMethod} style={{backgroundColor: state.isActive && state.method === 'put' ? 'lightgreen' : '#ccc',}}>PUT</span>
          <span id="delete" onClick={updateMethod} style={{backgroundColor: state.isActive && state.method === 'delete' ? 'lightgreen' : '#ccc',}}>DELETE</span>
        </label>
        {(state.method === 'put' || state.method === 'post') && <textarea cols={31} rows={8} placeholder='Request JSON Here' onChange={updateRequest}></textarea>}
      </form>
    </>
  );
}

export default Form;
