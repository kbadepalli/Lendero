const Head = (props) => {
  let headerColumns = props.headerColumns.map((column, index) => (
    <th key={index}>{column}</th>
  ));
  return (
    <thead>
      <tr>
        {headerColumns}
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default Head;
