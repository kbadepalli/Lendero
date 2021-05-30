import MainLayout from "../../../Layout/MainLayout";
import Widget from "../../../UI/Widget";
import UpdateRoleForm from "./Form";
const UpdateRole = (props) => {
  return (
    <MainLayout {...props}>
      <Widget className="col-lg-4 col-4 layout-spacing">
        <UpdateRoleForm {...props} />
      </Widget>
    </MainLayout>
  );
};

export default UpdateRole;
