import axios from 'axios';
import Swal from 'sweetalert2';
import { LoginResponse, UserCredentials } from '../context/user';
import { getErrorMessage } from '../utils/error';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
    throw new Error('La URL del backend no está configurada.');
}

const api = axios.create({
    baseURL: backendUrl,
    timeout: 25000, // 5 segundos
});

const showAlert = (type: 'success' | 'error', title: string, text: string) => {
    Swal.fire({
        icon: type,
        title,
        text,
        timer: type === 'success' ? 3000 : undefined,
        showConfirmButton: type !== 'success',
    });
};

const loginRequest = async (loginData: UserCredentials): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/aut/login', loginData);

        if (!response.data || typeof response.data.name !== 'string') {
            throw new Error('La respuesta del servidor no tiene el formato esperado.');
        }

        showAlert('success', 'Inicio de sesión exitoso', `Bienvenido, ${response.data.name}!`);
        return response.data;

    } catch (error: unknown) {
        let errorMessage = 'Ocurrió un error desconocido.';

        if (axios.isAxiosError(error)) {
            if (error.response) {
                errorMessage = getErrorMessage(error.response.status) || 'Error inesperado del servidor.';
            } else {
                errorMessage = 'Error de red o timeout.';
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        showAlert('error', 'Error al iniciar sesión', errorMessage);
        throw new Error(errorMessage);
    }
};

export default loginRequest;
