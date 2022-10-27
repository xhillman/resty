import './results.scss'
import JSONPretty from 'react-json-pretty';
let jsonPretty = require('react-json-pretty/dist/1337');
let jsonPretty2 = require('react-json-pretty/dist/acai');


const Results = (props) => {
  return (
    <section data-testid='output-area'>
      {props.loading ?
        <div className={'spinner'}></div> :
        <>
          <JSONPretty data-testid='jsonPretty1' id='json-pretty' data={props.data.headers} theme={jsonPretty}></JSONPretty>
          <JSONPretty data-testid='jsonPretty2' id='json-pretty2' data={props.data.data} theme={jsonPretty2}></JSONPretty>
        </>
      }
    </section>
  );
}

export default Results;
