import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateLoan, getLoan } from "../../../store/actions/loan";
import { getClients } from "../../../store/actions/client";
import { Redirect } from "react-router-dom";
import ClientOptions from "../../ClientOptions";
const UpdateLoanForm = () => {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    documentNumber: "",
    loanAmount: "",
    rateOfInterest: "",
    loanName: "",
    loanPeriod: "",
    dateOfLoan: "",
    clientId: "",
  });

  const { clients } = useSelector((state) => state.client);
  const { loan } = useSelector((state) => state.loan);
  const dispatch = useDispatch();

  useEffect(() => {
    const retrieveClientsAndLoan = async () => {
      const params = new URLSearchParams(props.location.search);
      await dispatch(getClients());
      await dispatch(getLoan(params.get("id")));
    };
    retrieveClientsAndLoan();
  }, [dispatch, props.location.search]);

  useEffect(() => {
    if (loan) setFormData(loan);
  }, [loan]);

  onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uLoan = async () => {
    await dispatch(updateLoan(formData));

    setRedirect("/loans");
  };

  const cancelUpdate = () => {
    setRedirect("/loans");
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <Form>
      <FormGroup>
        <Label for="clientId">Client</Label>
        <Input
          type="select"
          name="clientId"
          id="clientId"
          value={formData.clientId}
          onChange={(e) => this.onChange(e)}
        >
          <ClientOptions {...this.props}></ClientOptions>
        </Input>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="documentNumber">Document Number</Label>
            <Input
              type="text"
              name="documentNumber"
              id="documentNumber"
              value={formData.documentNumber}
              onChange={(e) => this.onChange(e)}
            />
          </FormGroup>
        </Col>{" "}
        <Col md={6}>
          <FormGroup>
            <Label for="loanAmount">Loan Amount</Label>
            <Input
              type="text"
              name="loanAmount"
              id="loanAmount"
              value={formData.loanAmount}
              onChange={(e) => this.onChange(e)}
            />
          </FormGroup>
        </Col>{" "}
      </Row>
      <FormGroup>
        <Label for="loanName">Loan Type</Label>
        <Input
          type="text"
          name="loanName"
          id="loanName"
          value={formData.loanName}
          onChange={(e) => this.onChange(e)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="loanPeriod">Loan Period</Label>
        <Input
          type="text"
          name="loanPeriod"
          id="loanPeriod"
          value={formData.loanPeriod}
          onChange={(e) => this.onChange(e)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="rateOfInterest">Rate Of Interest</Label>
        <Input
          type="text"
          name="rateOfInterest"
          id="rateOfInterest"
          value={formData.rateOfInterest}
          onChange={(e) => this.onChange(e)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="dateOfLoan">Date Of Loan</Label>
        <Input
          type="text"
          name="dateOfLoan"
          id="dateOfLoan"
          value={formData.dateOfLoan}
          onChange={(e) => this.onChange(e)}
        />
      </FormGroup>

      <Button onClick={uLoan} color="warning" className="m-2">
        Submit
      </Button>
      <Button onClick={cancelUpdate} color="danger">
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateLoanForm;
