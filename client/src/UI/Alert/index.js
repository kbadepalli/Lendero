import { useSelector } from "react-redux";
import { UncontrolledAlert } from "reactstrap";
const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  return alerts
    ? alerts.map((alert) => {
        return (
          <UncontrolledAlert key={alert.id} color={alert.alertType}>
            {alert.msg}
          </UncontrolledAlert>
        );
      })
    : "";
};

export default Alert;
