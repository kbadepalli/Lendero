import Head from "./Head";
import { Table } from "reactstrap";
const TableUI = (props) => {
  return (
    <div className="table-responsive">
      <Table className="table table-bordered mb-4">
        <Head {...props} />
        <tbody>{props.children}</tbody>
      </Table>
    </div>
  );
};

export default TableUI;
