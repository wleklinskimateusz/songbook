import { useEffect } from "react";
import { AlertStatus } from "../types";

export const useHandleAlert = (
  startTimeout: boolean,
  setStartTimeout: (val: boolean) => void,
  setAlert: (state: AlertStatus) => void
) => {
  useEffect(() => {
    if (startTimeout) {
      const timer = setTimeout(() => {
        setAlert(AlertStatus.None);
        setStartTimeout(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [startTimeout, setAlert, setStartTimeout]);
};
