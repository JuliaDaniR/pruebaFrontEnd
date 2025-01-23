import axios from 'axios';
import Swal from 'sweetalert2';
import { LoginResponse, UserCredentials } from '../context/user';
import { getErrorMessage } from '../utils/error';

const loginRequest = async (
  loginData: UserCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      'https://class-kit-backend.onrender.com/login', // URL del backend
      loginData,
      {
        headers: {
          'Content-Type': 'application/json', // Asegura que el tipo de contenido sea JSON
        },
        withCredentials: true, // Habilita el envío de cookies si el backend lo requiere
      },
    );

    Swal.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso',
      text: `Bienvenido, ${response.data.name}!`,
      timer: 3000,
      showConfirmButton: false,
    });

    return response.data;
  } catch (error: unknown) {
    let errorMessage = 'Ocurrió un error desconocido.';

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = getErrorMessage(error.response.status);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    Swal.fire({
      icon: 'error',
      title: 'Error al iniciar sesión',
      text: errorMessage,
    });

    throw new Error(errorMessage);
  }
};

export default loginRequest;
