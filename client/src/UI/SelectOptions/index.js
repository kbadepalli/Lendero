const SelectOptions = (props) => {
  return (
    <>
      {props.data.map((item) => {
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      })}
    </>
  );
};

export default SelectOptions;
