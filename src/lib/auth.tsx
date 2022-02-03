import LoaderSuspense from '@/components/LoaderSuspense';
import {
    AuthUser,
    getUser,
    LoginCredentialsDTO,
    loginWithUsernameAndPassword,
    RegisterCredentialsDTO,
    registerWithEmailAndPassword,
    UserResponse,
} from '@/features/auth';
import storage from '@/utils/storage';
import {initReactQueryAuth} from 'react-query-auth';

async function handleUserResponse(data: UserResponse) {
    const {user} = data;
    storage.setToken(data.accessToken);
    return user;
}

async function loadUser() {
    if (storage.getToken()) {
        const data = await getUser();
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
        return <LoaderSuspense/>;
    },
};

export const {AuthProvider, useAuth} = initReactQueryAuth<AuthUser | null,
    unknown,
    LoginCredentialsDTO,
    RegisterCredentialsDTO>(authConfig);
