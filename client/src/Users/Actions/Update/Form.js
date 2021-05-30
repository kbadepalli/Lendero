import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../../store/actions/role";
import { updateUser, getUser } from "../../../store/actions/user";
import RoleOptions from "../../RoleOptions";

const UpdateUserForm = (props) => {
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    role: "",
  });

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const getUserAndRoles = async () => {
      dispatch(getRoles());
      const params = new URLSearchParams(props.location.search);
      await dispatch(getUser(params.get("id")));
    };
    getUserAndRoles();
  }, [dispatch, props.location.search]);

  useEffect(() => {
    if (user)
      setFormData({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      });
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uUser = async () => {
    await dispatch(updateUser(formData));
    setRedirect("/users");
  };

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
        <Label for="role">Role</Label>
        <Input
          type="select"
          name="role"
          id="userRole"
          value={formData.role}
          onChange={(e) => onChange(e)}
        >
          <RoleOptions />
        </Input>
      </FormGroup>
      <Button onClick={uUser} color="warning" className="m-2">
        Submit
      </Button>
      <Button onClick={cancelUpdate} color="danger">
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateUserForm;
