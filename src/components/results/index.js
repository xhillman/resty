import './results.scss'
import JSONPretty from 'react-json-pretty';
let jsonPretty = require('react-json-pretty/dist/1337');
let jsonPretty2 = require('react-json-pretty/dist/acai');


const Results = (props) => {

  let headers;
  let data;
  let pointer = props.rerender.pointer;

  if(props.rerender.active){
    headers = props.history[pointer].data.headers;
    data = props.history[pointer].data.data
  } else {
    headers = props.data.headers;
    data = props.data.data;
  }

  return (
    <section data-testid='output-area'>
      {props.loading ?
        <div className={'spinner'}></div> :
        <>
          <JSONPretty data-testid='jsonPretty1' id='json-pretty' data={headers} theme={jsonPretty}></JSONPretty>
          <JSONPretty data-testid='jsonPretty2' id='json-pretty2' data={data} theme={jsonPretty2}></JSONPretty>
        </>
      }
    </section>
  );
}

export default Results;
