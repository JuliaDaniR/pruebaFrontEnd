// error.ts
export const getErrorMessage = (statusCode: number): string => {
	switch (statusCode) {
		case 400:
			return 'Petición incorrecta. Verifique los datos enviados.';
		case 401:
			return 'No autorizado. Verifique sus credenciales.';
		case 403:
			return 'Acceso prohibido. Sus credenciales son invalidas.';
		case 404:
			return 'Recurso no encontrado. Verifique la URL o el identificador.';
		case 500:
			return 'Error en el servidor. Intente nuevamente más tarde.';
		default:
			return 'Ocurrió un error desconocido. Intente nuevamente.';
	}
};
