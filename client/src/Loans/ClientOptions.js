const ClientOptions = (props) => {
  return (
    <>
      {props.clients.map((client) => {
        return (
          <option key={client.id} value={client.id}>
            {client.firstName} {client.lastName}
          </option>
        );
      })}
    </>
  );
};

export default ClientOptions;
