import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useToast } from "shared/components/Toast";
import { useActions } from "shared/redux/useActions";
import { selectLoginStatus } from "views/Login/Auth.selectors";
import { authActions } from "views/Login/Auth.slice";
import { LOGIN_STATUS } from "views/Login/constant";

export const useLogin = () => {
  const loginStatus = useSelector(selectLoginStatus);
  const {login} = useActions({
    login: authActions.login
  });

  const {showToast} = useToast();

  useEffect(() => {
    if (loginStatus === LOGIN_STATUS.SUCCESS) {
      showToast({
        type: 'success',
        message: 'Login success!'
      })
    } else {
      if (loginStatus === LOGIN_STATUS.FAILURE) {
        showToast({
          type: 'error',
          message: 'Login fail!'
        })
      }
    }
  }, [loginStatus])

  return login;
}