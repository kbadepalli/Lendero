import MainLayout from "../../../Layout/MainLayout";
import Widget from "../../../UI/Widget";
import UpdateLoanForm from "./Form";
const UpdateLoan = () => {
  return (
    <MainLayout {...props}>
      <Widget className="col-lg-4 col-4 layout-spacing">
        <UpdateLoanForm {...props} />
      </Widget>
    </MainLayout>
  );
};

export default UpdateLoan;
