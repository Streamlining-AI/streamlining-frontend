import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserApi from "../../api/user";
import { Token, User, UserState } from "../types";

export const initialState: UserState = {
  user: undefined,
  token: undefined,
  isDark: false,
  error: undefined,
  redirectURL: undefined,
};

export const fetchRegister = createAsyncThunk<
  {
    InsertedID: string;
  },
  { username: string; password: string }
>("/users/register", async ({ username, password }) => {
  const response = await UserApi.register(username, password);
  return response.data;
});

export const fetchLogin = createAsyncThunk<
  {
    ID: string;
    email: string;
    token: string;
  },
  { username: string; password: string },
  {
    rejectValue: { error: string };
  }
>("/users/login", async ({ username, password } , {rejectWithValue}) => {
  try {
    const response = await UserApi.login(username, password);
    return response.data;
  } catch (err) {
    const res: AxiosError<{ error: string }> = err as AxiosError<{
      error: string;
    }>;
    if (!res.response) {
      throw err;
    }
    return rejectWithValue(res.response.data);
  }
});

export const fetchLoginGithub = createAsyncThunk<{ redirectURL: string }>(
  "users/login/github",
  async () => {
    const response = await UserApi.loginGithub();
    return response.data;
  }
);

// export const fetchCallbackGithub = createAsyncThunk<
//   {
//     user: User;
//     tokens: Token;
//   },
//   {code : string}
// >("/users/login/github/callback", async ({code}) => {
//   const response = await UserApi.callbackGithub(code);
//   return response.data;
// });

export const fetchCallbackGithub = createAsyncThunk<
  { ID: string; username: string; token: string },
  { Code: string }
>("/users/login/github/callback", async ({ Code }) => {
  const response = await UserApi.callbackGithub(Code);
  return response.data;
});

export const fetchLogout = createAsyncThunk<void, void>(
  "/users/logout",
  async () => {
    await UserApi.logout();
  }
);

export const fetchUser = createAsyncThunk<User, { accessToken: string }>(
  "user/fetchUser",
  async ({ accessToken }) => {
    const response = await UserApi.current(accessToken);
    return response.data;
  }
);

export const fetchRefreshToken = createAsyncThunk<
  {
    access: Token;
    refresh: Token;
  },
  { refreshToken: string }
>("user/fetchRefreshToken", async ({ refreshToken }) => {
  const response = await UserApi.refresh(refreshToken);
  return response.data;
});

export const fetchUpdateUser = createAsyncThunk<
  User,
  { accessToken: string; username?: string; password?: string },
  {
    rejectValue: { message: string };
  }
>(
  "user/fetchUpdateUser",
  async ({ accessToken, username, password }, { rejectWithValue }) => {
    try {
      const response = await UserApi.update(accessToken, username, password);
      return response.data;
    } catch (err) {
      const error: AxiosError<{ message: string }> = err as AxiosError<{
        message: string;
      }>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      delete state.error;
    },
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchRegister.fulfilled,
        (state, { payload: { InsertedID } }) => {
          state.user!.id = InsertedID;
          
        }
      )
      .addCase(
        fetchLogin.fulfilled,
        (state, { payload: { ID, email, token } }) => {
          state.user = { id: ID, username: email };
          state.token = token;
          toast.success(`Welcome ${email}! 👏`)
        }
      )

      .addCase(fetchLogin.rejected, (state, { payload }) => {
        toast.error(payload!.error);
      })

      .addCase(
        fetchLoginGithub.fulfilled,
        (state, { payload: { redirectURL } }) => {
          state.redirectURL = redirectURL;
        }
      )
      .addCase(
        fetchCallbackGithub.fulfilled,
        (state, { payload: { ID, username, token } }) => {
          state.user = { id: ID, username: username };
          state.token = token;
          toast.success(`Welcome ${username}! 👏`)
          // window.location.replace("/dashboard"); 
        }
      )
      .addCase(fetchLogout.fulfilled, (state) => {
        toast.success(`👏GoodBye ${state.user?.username}!`)
        state.user = undefined;
        state.token = undefined;
      })
      .addCase(fetchUser.fulfilled, (state, { payload: { id, username } }) => {
        state.user = {
          id,
          username,
        };
      })
      .addCase(
        fetchRefreshToken.fulfilled,
        (state, { payload: { access, refresh } }) => {
          // state.tokens = {
          //   access,
          //   refresh,
          // };
        }
      )
      .addCase(fetchUpdateUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(fetchUpdateUser.rejected, (state, { payload }) => {
        state.error = payload?.message;
      });
  },
});

// Actions
export const { resetError, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
