import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { createLoan } from "../../../store/actions/loan";
import { getClients } from "../../../store/actions/client";
import { Redirect } from "react-router-dom";
import ClientOptions from "../../ClientOptions";
const AddLoanForm = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({
    documentNumber: "",
    loanAmount: "",
    rateOfInterest: "",
    loanName: "",
    loanPeriod: "",
    dateOfLoan: "",
    clientId: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addLoan = async () => {
    await dispatch(createLoan(this.state.formData));

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
          onChange={(e) => onChange(e)}
        >
          <ClientOptions {...props}></ClientOptions>
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
              value={formData.firstName}
              onChange={(e) => onChange(e)}
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
              onChange={(e) => onChange(e)}
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="loanName">Loan Type</Label>
        <Input
          type="text"
          name="loanName"
          id="loanName"
          value={formData.loanName}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="loanPeriod">Loan Period</Label>
        <Input
          type="text"
          name="loanPeriod"
          id="loanPeriod"
          value={formData.loanPeriod}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="rateOfInterest">Rate Of Interest</Label>
        <Input
          type="text"
          name="rateOfInterest"
          id="rateOfInterest"
          value={formData.rateOfInterest}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="dateOfLoan">Date Of Loan</Label>
        <Input
          type="text"
          name="dateOfLoan"
          id="dateOfLoan"
          value={formData.dateOfLoan}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>

      <Button onClick={addLoan} color="warning" className="m-2">
        Submit
      </Button>
      <Button onClick={cancelUpdate} color="danger">
        Cancel
      </Button>
    </Form>
  );
};

export default AddLoanForm;
