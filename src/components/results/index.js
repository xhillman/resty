import './results.scss'

const Results = (props) => {
  return (
    <section data-testid='output-area'>
      <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
    </section>
    // <section>
    //   <pre>{props.data ? JSON.stringify(props.data.count, props.data.headers, props.data.body) : null}</pre>
    // </section>
  );
}

export default Results;
