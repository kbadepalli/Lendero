import MainLayout from "../../../Layout/MainLayout";
import Widget from "../../../UI/Widget";
import AddLoanForm from "./Form";
const AddLoan = (props) => {
  return (
    <MainLayout {...props}>
      <Widget className="col-lg-4 col-4 layout-spacing">
        <AddLoanForm {...props} />
      </Widget>
    </MainLayout>
  );
};

export default AddLoan;
