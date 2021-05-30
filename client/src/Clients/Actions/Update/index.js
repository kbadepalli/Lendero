import MainLayout from "../../../Layout/MainLayout";
import Widget from "../../../UI/Widget";
import UpdateClientForm from "./Form";
const UpdateClient = (props) => {
  return (
    <MainLayout {...props}>
      <Widget className="col-lg-4 col-4 layout-spacing">
        <UpdateClientForm {...props} />
      </Widget>
    </MainLayout>
  );
};

export default UpdateClient;
