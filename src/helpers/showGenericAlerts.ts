import Swal from 'sweetalert2';

interface AlertMessage {
  title: string;
  text: string;
}

export const showSuccessAlert = (
  {
    text = 'El proceso se hizo correctamente',
    title = '¡Éxito!'
  }: Partial<AlertMessage> = {}
) => {
  Swal.fire({
    title,
    text,
    icon: 'success',
    timer: 3000,
  });
}

export const showFailAlert = (
  {
    text = 'No se pudo completar el proceso',
    title = '¡Hubo un problema inesperado!',
  }: Partial<AlertMessage> = {}
) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    timer: 3000,
  });
}
