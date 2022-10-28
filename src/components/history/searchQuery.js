function SearchQuery(props) {

  
  // const rerender = () => {
  //   let key = props.pointer;
  //   props.rerender(key);
  // }

  return (
    <div>
      <p>Method: {props.search.method}</p>
      <p>URL: {props.search.url}</p>
      <button onClick={props.rerender(props.pointer)}>Rerun Query</button>
    </div>
  )
}

export default SearchQuery;