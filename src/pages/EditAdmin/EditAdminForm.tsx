import { useEffect, useState } from 'react';
import { validationFormAdminUpdate } from '../../utils/validations';
import { EditAdminButton } from './EditAdminButton';
import { useAuthProvider } from '../../context/AuthProvider';
import { AdminPut } from '../../models/admin/AdminGet';
import { getAdminData, updateAdminRequest } from '../../services/adminRequest';
import Swal from 'sweetalert2';

const inputClass =
	'mt-1 block w-[40vw] p-2 rounded-sm border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';
const divInputClass = 'flex items-center py-2 justify-between mx-8';

export const EditAdminForm: React.FC = () => {
	const [formData, setFormData] = useState<AdminPut>({
		dni: '',
		full_name: ' ',
		email: '',
		password: '*',
		password2: '*',
	});

	const { user } = useAuthProvider();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getAdmin = async () => {
			if (user?.name) {
				try {
					const data = await getAdminData(user.name, user.jwtToken);
					setFormData({
						dni: data?.dni || '',
						full_name: data?.fullName || '',
						email: data?.email || '',
						password: '',
						password2: '',
					});
					setLoading(false);
				} catch (error) {
					console.error('Error al cargar los datos del administrador:', error);
				}
			}
		};
		getAdmin();
	}, [user?.name, user?.jwtToken]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
			...(name === 'password' && { password2: value }),
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = await Swal.fire({
			title: '¿Estás seguro?',
			text: '¿Quieres guardar los cambios realizados?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, guardar',
			cancelButtonText: 'Cancelar',
		});

		if (result.isConfirmed) {
			const errorMessage = validationFormAdminUpdate({
				...formData,
			});

			if (errorMessage) {
				throw new Error(errorMessage);
			}
			try {
				setFormData({ ...formData, ['password2']: formData.password });
				await updateAdminRequest(formData, user?.jwtToken);
			} catch (error) {
				console.error('Error al registrarse:', error);
			}
		}
		return;
	};

	if (loading) {
		return <p>Cargando datos del administrador...</p>;
	}

	return (
		<>
			<div className='bg-white shadow-md rounded px-8 pt-6 pb-8 m-4'>
				<h2 className='text-2xl py-6 px-2 text-sky-500 sm:pt-10 font-bold'>
					Administrador
				</h2>
				<form
					className='grid grid-cols-1 sm:grid-cols-1 gap-4'
					onSubmit={handleSubmit}>
					<div className={divInputClass}>
						<label
							htmlFor='full_name'
							className='block text-sm font-medium text-sky-600'>
							Nombre:
						</label>
						<input
							type='text'
							name='full_name'
							id='full_name'
							value={formData.full_name}
							onChange={handleInputChange}
							className={inputClass}
						/>
					</div>
					<div className={divInputClass}>
						<label
							htmlFor='dni'
							className='block text-xs font-medium text-sky-600'>
							DNI:
						</label>
						<input
							type='text'
							name='dni'
							id='dni'
							value={formData.dni}
							onChange={handleInputChange}
							className={inputClass}
						/>
					</div>
					<div className={divInputClass}>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-sky-600'>
							Email:
						</label>
						<input
							type='email'
							name='email'
							id='email'
							value={formData.email}
							onChange={handleInputChange}
							className={inputClass}
						/>
					</div>
					<div className={divInputClass}>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-sky-600'>
							Password:
						</label>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='*******'
							onChange={handleInputChange}
							className={inputClass}
						/>
					</div>
					<EditAdminButton />
				</form>
			</div>
		</>
	);
};
