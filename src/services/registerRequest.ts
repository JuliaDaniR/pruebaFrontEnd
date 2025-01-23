import axios from 'axios';
import Swal from 'sweetalert2';
import { RegisterResponse } from '../context/register';
import { getErrorMessage } from '../utils/error';
import { UserRegister } from '../models/UserRegister';

const registerRequest = async (
  userRegisterInFormData: UserRegister,
): Promise<RegisterResponse> => {
  try {
    const token = localStorage.getItem('jwtToken'); // Recuperar el token desde el almacenamiento local

    const response = await axios.post<RegisterResponse>(
      'https://class-kit-backend.onrender.com/institution/register', // URL completa del backend
      { ...userRegisterInFormData },
      {
        headers: {
          'Content-Type': 'application/json', // Configura el tipo de contenido
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
        withCredentials: true, // Habilita el envío de cookies si el backend lo requiere
      },
    );

    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: `Bienvenido, ${response.data.name}!`,
      timer: 23000,
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
      title: 'Error al registrarse',
      text: errorMessage,
    });

    throw new Error(errorMessage);
  }
};

export default registerRequest;
