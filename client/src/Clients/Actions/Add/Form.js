import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { createClient } from "../../../store/actions/client";
import { Redirect } from "react-router-dom";
const AddClientForm = () => {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    workNumber: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const addClient = async () => {
    await dispatch(createClient(formData));

    setRedirect("/clients");
  };

  const cancelUpdate = () => {
    setRedirect("/clients");
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <Form>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => onChange(e)}
            />
          </FormGroup>
        </Col>{" "}
        <Col md={6}>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => onChange(e)}
            />
          </FormGroup>
        </Col>{" "}
      </Row>
      <FormGroup>
        <Label for="email">Email Address</Label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="contactNumber">Contact Number</Label>
            <Input
              type="text"
              name="contactNumber"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => onChange(e)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="workNumber">Work Number</Label>
            <Input
              type="text"
              name="workNumber"
              id="workNumber"
              value={formData.contactNumber}
              onChange={(e) => onChange(e)}
            />
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <Label for="addressLineOne">Address Line One</Label>
        <Input
          type="text"
          name="addressLineOne"
          id="addressLineOne"
          value={formData.addressLineOne}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="addressLineOne">Address Line One</Label>
        <Input
          type="text"
          name="addressLineOne"
          id="addressLineOne"
          value={formData.addressLineOne}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="addressLineTwo">Address Line Two</Label>
        <Input
          type="text"
          name="addressLineTwo"
          id="addressLineTwo"
          value={formData.addressLineTwo}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="state">State</Label>
        <Input
          type="text"
          name="state"
          id="state"
          value={formData.state}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="postcode">Postcode</Label>
        <Input
          type="text"
          name="postcode"
          id="postcode"
          value={formData.postcode}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="country">Country</Label>
        <Input
          type="text"
          name="country"
          id="country"
          value={formData.country}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <Button onClick={addClient} color="warning" className="m-2">
        Submit
      </Button>
      <Button onClick={cancelUpdate} color="danger">
        Cancel
      </Button>
    </Form>
  );
};

export default AddClientForm;
