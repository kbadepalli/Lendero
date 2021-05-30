import MainLayout from "../../../Layout/MainLayout";
import Widget from "../../../UI/Widget";
import AddRoleForm from "./Form";
const AddRole = (props) => {
  return (
    <MainLayout {...props}>
      <Widget className="col-lg-4 col-4 layout-spacing">
        <AddRoleForm {...props} />
      </Widget>
    </MainLayout>
  );
};

export default AddRole;
