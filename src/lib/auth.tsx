import { initReactQueryAuth } from 'react-query-auth';

import {
    AuthUser, getUser, LoginCredentialsDTO, loginWithUsernameAndPassword, RegisterCredentialsDTO,
    registerWithEmailAndPassword, UserResponse
} from '@/features/auth';
import storage from '@/utils/storage';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

async function handleUserResponse(data: UserResponse) {
  const { user } = data;
  storage.setToken(data.accessToken);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    console.log(data);
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithUsernameAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
