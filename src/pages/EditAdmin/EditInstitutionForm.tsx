import React, { useState } from 'react';
import { AdminInfo } from '../AdminDashboard';
import { InstitutionUpdate } from '../../models/admin/InstitutionUpdate';
import { EditAdminButton } from './EditAdminButton';
import { validateForm } from '../../utils/validations';
import { updateInstitution } from '../../services/institutionRequest';
import { useAuthProvider } from '../../context/AuthProvider';

const inputClass =
	'mt-1 block w-[40vw] p-2 rounded-sm border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';
const divInputClass = 'flex items-center py-2 justify-between mx-8';

export const EditInstitutionForm: React.FC<AdminInfo> = (admin) => {
	const { user } = useAuthProvider();
	const [formData, setFormData] = useState<AdminInfo>({
		...admin,
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const institutionData: InstitutionUpdate = {
			cue: formData.cue,
			name: formData.name,
			educational_level: formData.educational_level,
			address: formData.address,
			email: formData.email,
			phone: formData.phone,
			website: formData.website,
		};
		const errorMessage = validateForm({
			...formData,
			['password_admin']: formData.password_admin,
		});

		if (errorMessage) {
			throw new Error(errorMessage);
		}

		try {
			await updateInstitution(institutionData, user?.jwtToken);
		} catch (error) {
			console.error('Error al registrarse:', error);
			alert('Hubo un problema con el registro. Inténtalo de nuevo más tarde.');
		}
	};
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
						id='email'
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
