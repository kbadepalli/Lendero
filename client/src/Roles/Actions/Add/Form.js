import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { createRole } from "../../../store/actions/role";
import { Redirect } from "react-router-dom";
const AddRoleForm = () => {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();

  const addRole = async () => {
    await dispatch(createRole(formData));
    setRedirect("/roles");
  };

  const cancelUpdate = () => {
    setRedirect("/roles");
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <Form>
      <FormGroup>
        <Label for="roleName">Name of the role</Label>
        <Input
          type="text"
          name="name"
          id="roleName"
          placeholder="Role name"
          value={formData.name}
          onChange={(e) => onChange(e)}
        />
      </FormGroup>
      <Button onClick={addRole} color="warning" className="m-2">
        Submit
      </Button>
      <Button onClick={cancelUpdate} color="danger">
        Cancel
      </Button>
    </Form>
  );
};

export default AddRoleForm;
