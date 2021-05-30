import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { createUser } from "../../../store/actions/user";
import { getRoles } from "../../../store/actions/role";
import { Redirect } from "react-router-dom";
import RoleOptions from "../../RoleOptions";
const AddUserForm = () => {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const addUser = async () => {
    await dispatch(createUser(formData));
    setRedirect("/users");
  };

  useEffect(() => {
    dispatch(getRoles());
  });

  const cancelUpdate = () => {
    setRedirect("/users");
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <Form>
      <FormGroup>
        <Label for="fullname">Full Name</Label>
        <Input
          type="text"
          name="fullName"
          id="fullname"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="userEmail">Email Address</Label>
        <Input
          type="text"
          name="email"
          id="userEmail"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="userPassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="userPassword"
          value={formData.password}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="role">Role</Label>
        <Input
          type="select"
          name="role"
          id="userRole"
          value={formData.role}
          onChange={(e) => onChange(e)}
        >
          <option value="">Select Role</option>
          <RoleOptions></RoleOptions>
        </Input>
      </FormGroup>
      <Button onClick={addUser} color="warning" className="m-2">
        Submit
      </Button>
      <Button onClick={cancelUpdate} color="danger">
        Cancel
      </Button>
    </Form>
  );
};

export default AddUserForm;
