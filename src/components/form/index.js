import { useState } from 'react';
import './form.scss';

const Form = (props) => {

  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [request, setRequest] = useState(null)

  const updateUrl = (e) => {
    setUrl(e.target.value);
  }

  const updateMethod = (e) => {
    setMethod(e.target.id.toUpperCase());
    setIsActive(true);
  }

  const updateRequest = (e) => {
    setRequest(e.target.value);
  }

  let handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      body: request,
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
          <span id="get" onClick={updateMethod} style={{backgroundColor: isActive && method === 'GET' ? 'lightgreen' : '#ccc',}}>GET</span>
          <span id="post" onClick={updateMethod} style={{backgroundColor: isActive && method === 'POST' ? 'lightgreen' : '#ccc',}}>POST</span>
          <span id="put" onClick={updateMethod} style={{backgroundColor: isActive && method === 'PUT' ? 'lightgreen' : '#ccc',}}>PUT</span>
          <span id="delete" onClick={updateMethod} style={{backgroundColor: isActive && method === 'DELETE' ? 'lightgreen' : '#ccc',}}>DELETE</span>
        </label>
        {(method === 'PUT' || method === 'POST') && <textarea cols={31} rows={8} placeholder='Request JSON Here' onChange={updateRequest}></textarea>}
      </form>
    </>
  );
}

export default Form;
