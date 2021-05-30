const Address = (props) => {
  return (
    <>
      <p>{props.address.addressLineOne ? props.address.addressLineOne : ""}</p>

      <p>{props.address.addressLineTwo ? props.address.addressLineTwo : ""}</p>

      <p>{props.address.city ? props.address.city : ""}</p>

      <p>{props.address.state ? props.address.state : ""}</p>

      <p>{props.address.postCode ? props.address.postCode : ""}</p>

      <p>{props.address.country ? props.address.country : ""}</p>
    </>
  );
};

export default Address;
