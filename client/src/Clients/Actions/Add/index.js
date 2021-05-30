import MainLayout from "../../../Layout/MainLayout";
import Widget from "../../../UI/Widget";
import AddClientForm from "./Form";
const AddClient = (props) => {
  return (
    <MainLayout {...props}>
      <Widget className="col-lg-4 col-4 layout-spacing">
        <AddClientForm {...props} />
      </Widget>
    </MainLayout>
  );
};

export default AddClient;
