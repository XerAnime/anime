import React, { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type} m-5`} role='alert'>
        <i className='bi bi-exclamation-triangle-fill' />
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
