import { useSelector } from "react-redux";
const RoleOptions = () => {
  const roles = useSelector((state) => state.role.roles);

  return (
    <>
      {roles.map((role) => {
        return (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        );
      })}
    </>
  );
};

export default RoleOptions;
