import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, AppState } from "../";
import { User } from "../types";
import { FormLogin } from "../../pages/ Login/type";
import { FormRegister } from "../../pages/Register/type";
import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchLoginGithub,
  fetchCallbackGithub,
  resetError as resetErrorAction,
  toggleTheme as toggleThemeAction,
} from ".";


export const useTheme = (): [boolean, () => void] => {
  const dispatch = useAppDispatch();
  const isDark = useSelector<AppState, AppState["user"]["isDark"]>(
    (state) => state.user.isDark
  );

  const toggleTheme = useCallback(() => {
    dispatch(toggleThemeAction());
  }, [dispatch]);

  return [isDark, toggleTheme];
};

// export const useFetchUser = (): void => {
//   const dispatch = useAppDispatch();
//   const token = useSelector<AppState, AppState["user"]["token"]>(
//     (state) => state.user.token
//   );

//   useEffect(() => {
//     if (tokens)
//       if (Date.parse(tokens.access.expires) > Date.now()) {
//         dispatch(fetchUser({ accessToken: tokens.access.token }));
//       } else if (Date.parse(tokens.refresh.expires) > Date.now()) {
//         dispatch(fetchRefreshToken({ refreshToken: tokens.refresh.token }));
//       }
//   }, [tokens, dispatch]);
// };

export const useUser = (): {
  user?: User;
  error?: string;
  handleRegister: ({ username, password , cf_password }: FormRegister) => void;
  handleLogin: ({ username, password }: FormLogin) => void;
  handleLoginGithub: () => void;
  handleCallbackGithub: (code: string) => void;
  handleLogout: () => void;
} => {
  const dispatch = useAppDispatch();
  const { user, error, token } = useSelector<AppState, AppState["user"]>(
    (state) => state.user
  );

  const handleRegister = useCallback(
    ({ username, password }: { username: string; password: string }) =>
      dispatch(fetchRegister({ username, password })),
    [dispatch]
  );

  const handleLogin = useCallback(
    ({ username, password }: { username: string; password: string }) =>
      dispatch(fetchLogin({ username, password })),
    [dispatch]
  );

  const handleLoginGithub = useCallback(
    () => dispatch(fetchLoginGithub()),
    [dispatch]
  );

  const handleCallbackGithub = useCallback((Code:string)=>dispatch(fetchCallbackGithub({Code : Code})),[dispatch]);

  const handleLogout = useCallback(
    () =>
      token && dispatch(fetchLogout()),
    [token, dispatch]
  );

  //   const handleUpdate = useCallback(
  //     ({ username, password }) =>
  //       tokens && dispatch(fetchUpdateUser({ accessToken: tokens.access.token, username, password })),
  //     [tokens, dispatch],
  //   );

  useEffect(() => {
    dispatch(resetErrorAction());
  }, [dispatch]);

  return { user, error, handleRegister, handleLogin, handleLogout , handleLoginGithub , handleCallbackGithub };
};
