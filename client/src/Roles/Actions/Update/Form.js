import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRole, getRole } from "../../../store/actions/role";
import { Redirect } from "react-router-dom";
const UpdateRoleForm = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({ id: "", name: "" });

  const { role } = useSelector((state) => state.role);

  const dispatch = useDispatch();
  useEffect(() => {
    const retriveRole = async () => {
      const params = new URLSearchParams(props.location.search);
      await dispatch(getRole(params.get("id")));
    };
    retriveRole();
  }, [dispatch, props.location.search]);

  useEffect(() => {
    if (role) setFormData({ id: role.id, name: role.name });
  }, [role]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uRole = async () => {
    await dispatch(updateRole(formData));

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
      <Button onClick={uRole} color="warning" className="m-2">
        Submit
      </Button>
      <Button onClick={cancelUpdate} color="danger">
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateRoleForm;
