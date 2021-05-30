import MainLayout from "../../../Layout/MainLayout";
import Widget from "../../../UI/Widget";
import AddUserForm from "./Form";
const AddUser = (props) => {
  return (
    <MainLayout {...props}>
      <Widget className="col-lg-4 col-4 layout-spacing">
        <AddUserForm {...props} />
      </Widget>
    </MainLayout>
  );
};

export default AddUser;
