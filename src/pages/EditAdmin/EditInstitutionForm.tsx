import React, { useEffect, useState } from 'react';
import { InstitutionUpdate } from '../../models/admin/InstitutionUpdate';
import { EditAdminButton } from './EditAdminButton';
import { validateFormInstitutionUpdate } from '../../utils/validations';
import {
	getInstitutionData,
	updateInstitution,
} from '../../services/institutionRequest';
import { useAuthProvider } from '../../context/AuthProvider';
import { AdminGet } from '../../models/admin/AdminGet';
import Swal from 'sweetalert2';

const inputClass = `mt-1 block w-[40vw] p-2 rounded-sm border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`;
const divInputClass = 'flex items-center py-2 justify-between mx-8';

export const EditInstitutionForm: React.FC<AdminGet> = (admin) => {
	const { user } = useAuthProvider();
	const [loading, setLoading] = useState<boolean>(true);
	const [formData, setFormData] = useState<InstitutionUpdate>({
		cue: '',
		name: '',
		educational_level: '',
		address: '',
		email: '',
		phone: '',
		website: '',
	});

	useEffect(() => {
		const getAdmin = async () => {
			if (user?.name && admin?.nameSchool) {
				try {
					const data = await getInstitutionData(
						admin.nameSchool,
						user.jwtToken,
					);
					setFormData({
						cue: data?.cue || '',
						name: data?.name || '',
						educational_level: data?.educational_level || '',
						address: data?.address || '',
						email: data?.email || '',
						phone: data?.phone || '',
						website: data?.website || '',
					});
					setLoading(false);
				} catch (error) {
					console.error('Error al cargar los datos del administrador:', error);
				}
			}
		};
		getAdmin();
	}, [user?.name, user?.jwtToken, admin.nameSchool]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
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
			const errorMessage = validateFormInstitutionUpdate({
				...formData,
			});

			if (errorMessage) {
				throw new Error(errorMessage);
			}
			try {
				await updateInstitution(formData, user?.jwtToken);
			} catch (error) {
				console.error('Error al registrarse:', error);
				alert(
					'Hubo un problema con el registro. Inténtalo de nuevo más tarde.',
				);
			}
		}
	};
	if (loading) {
		return <p>Cargando datos de la institucion...</p>;
	}
	return (
		<div className='bg-white shadow-2xl rounded px-8 pt-6 pb-8 m-4'>
			<h2 className='text-2xl py-6 px-2 text-sky-500 sm:pt-10 font-bold'>
				Institucion
			</h2>
			<form
				className='grid grid-cols-1 sm:grid-cols-1 gap-4'
				onSubmit={handleSubmit}>
				<div className={divInputClass}>
					<label
						htmlFor='cue'
						className='block text-sm font-medium text-sky-600'>
						Institución:
					</label>
					<input
						type='text'
						name='cue'
						id='cue'
						value={formData.cue}
						onChange={handleInputChange}
						className={inputClass}
					/>
				</div>
				<div className={divInputClass}>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-sky-600'>
						Institución:
					</label>
					<input
						type='text'
						name='name'
						id='name'
						value={formData.name}
						onChange={handleInputChange}
						className={inputClass}
					/>
				</div>
				<div className={divInputClass}>
					<label
						htmlFor='educational_level'
						className='block text-sm font-medium text-sky-600'>
						Nivel Educativo:
					</label>
					<select
						name='educational_level'
						id='educational_level'
						className={inputClass}
						onChange={handleInputChange}
						value={formData.educational_level}
						required>
						<option value='' disabled>
							Selecciona nivel educativo:
						</option>
						<option value='PRIMARY'>Primario</option>
						<option value='SECONDARY'>Secundario</option>
						<option value='TERTIARY'>Terciario</option>
						<option value='UNIVERSITY'>Universitario</option>
					</select>
				</div>
				<div className={divInputClass}>
					<label
						htmlFor='address'
						className='block text-sm font-medium text-sky-600'>
						Dirección:
					</label>
					<input
						type='text'
						name='address'
						id='address'
						value={formData.address}
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
						id='email_Istitution'
						value={formData.email}
						onChange={handleInputChange}
						className={inputClass}
					/>
				</div>
				<div className={divInputClass}>
					<label
						htmlFor='phone'
						className='block text-sm font-medium text-sky-600'>
						Teléfono:
					</label>
					<input
						type='tel'
						name='phone'
						id='phone'
						value={formData.phone}
						onChange={handleInputChange}
						className={inputClass}
					/>
				</div>
				<div className={divInputClass}>
					<label
						htmlFor='website'
						className='block text-sm font-medium text-sky-600'>
						Sitio Web:
					</label>
					<input
						type='url'
						name='website'
						id='website'
						value={formData.website}
						onChange={handleInputChange}
						className={inputClass}
					/>
				</div>
				<EditAdminButton />
			</form>
		</div>
	);
};
