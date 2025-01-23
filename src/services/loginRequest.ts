import axios from 'axios';
import Swal from 'sweetalert2';
import { LoginResponse, UserCredentials } from '../context/user';
import { getErrorMessage } from '../utils/error';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const loginRequest = async (
    loginData: UserCredentials,
): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${backendUrl}/aut/login`,
            loginData
        );

        // Si la respuesta tiene un cuerpo, maneja el éxito
        if (response && response.data) {
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: `Bienvenido, ${response.data.name}!`,
                timer: 3000,
                showConfirmButton: false,
            });

            return response.data;  // Retorna los datos de login
        }

        throw new Error('Respuesta vacía del servidor');
    } catch (error: unknown) {
        let errorMessage = 'Ocurrió un error desconocido.';

        // Depurar el error para ver si hay algo más que capturar
        console.error(error);

        if (axios.isAxiosError(error)) {
            // Verificar si la respuesta existe y manejar el error
            if (error.response) {
                errorMessage = getErrorMessage(error.response.status);
            } else {
                errorMessage = 'Error de red o timeout.';
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        // Mostrar mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: errorMessage,
        });

        // Lanza un nuevo error para propagarlo si es necesario
        throw new Error(errorMessage);
    }
};

export default loginRequest;
