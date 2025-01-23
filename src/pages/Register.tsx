import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validateForm } from '../utils/validations';
import logo from '/logo-box.svg';
import '../App.css';
import registerRequest from '../services/registerRequest';
import { UserRegister } from '../models/UserRegister';

const registerContainer =
	'flex items-center justify-center gap-20 bg-zinc-50 px-4 pt-16';
const formElement = 'bg-white p-6 rounded-lg shadow-md w-full max-w-md my-10';
const inputField = 'mb-4 p-1.5 border border-gray-300 rounded w-full';
const submitButton =
	'mt-6 bg-sky-500 text-white p-2 rounded w-full hover:bg-sky-400';
const leftText = 'text-sky-500 font-sans text-5xl pb-4';
const leftTextSimple =
	'text-sky-500 font-sans text-xl pb-4 text-justify leading-relaxed';


const Register: React.FC = () => {
	const initialFormData: UserRegister = {
		cue: "123",
		name: "pedro",
		educational_level: "PRIMARY",
		address: "calle",
		email: "pedro@gmail.com",
		phone: "321321",
		website: "https://www.lkjl.com",
		dniAdmin: "32654789",
		full_name_admin: "pedro tal",
		email_admin: "pedrotal@gmail.com",
		password_admin: "Pedro123#",
		password2_admin: "Pedro123#"
	}

	const [formData, setFormData] = useState(initialFormData);

	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prevFormData => {
			prevFormData[name as keyof UserRegister] = value;
			return { ...formData, [name]: value }
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errorMessage = validateForm(formData);

		if (errorMessage) {
			alert(errorMessage);
			return;
		}

		try {
			await registerRequest(formData);
			alert('Administrador registrado con éxito');
			navigate('/login');
			// navigate('/register');

		} catch (error) {
			console.error('Error al registrarse:', error);
			alert('Hubo un problema con el registro. Inténtalo de nuevo más tarde.');
		}

	};

	return (
		<div>
			<Header />

			<div className={registerContainer}>
				<div className='flex flex-col gap-2'>
					<div>
						<img
							src={logo}
							alt='classkit box logo'
							className='w-[600px] opacity-[0.05] fixed top-[20vh] left-10'
						/>
						<p className={leftText}>
							Bienvenido a Class
							<span className='text-orange-400 italic'>Kit</span>
						</p>
					</div>
					<div className='max-w-[500px]'>
						<p className={leftTextSimple}>
							Optimiza la gestión de los recursos de tu institución en un solo
							lugar. Regístrate como administrador para comenzar a crear y
							gestionar tu inventario de manera eficiente. ¡Facilita el acceso a
							proyectores, mapas y más para tus profesores con solo unos clics!
						</p>
						<p className={leftTextSimple}>
							Completa el registro y transforma la forma en que administras los
							recursos educativos.
						</p>
					</div>
				</div>

				<form className={formElement} onSubmit={handleSubmit}>
					<h2 className='text-2xl font-medium mb-6 text-sky-500'>
						Registrar Administrador
					</h2>
					<input
						type='text'
						name='full_name_admin'
						placeholder='Nombre completo'
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='text'
						name='dniAdmin'
						placeholder='DNI'
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='email'
						name='email_admin'
						placeholder='Email'
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='password'
						name='password_admin'
						placeholder='Contraseña'
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='password'
						name='password2_admin'
						placeholder='Confirmar Contraseña'
						className={inputField}
						onChange={handleChange}
					/>
					<h2 className='text-2xl font-medium mb-6 text-sky-500'>
						Datos de Institución
					</h2>
					<input
						type='text'
						name='name'
						placeholder='Institución'
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='text'
						name='cue'
						placeholder='CUE'
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='email'
						name='email'
						placeholder='Email'
						className={inputField}
						onChange={handleChange}
					/>
					<select
						name="educational_level"
						className={inputField}
						onChange={handleChange}
						value={formData.educational_level}
						required
					>
						<option value="" disabled>
							Selecciona nivel educativo
						</option>
						<option value="PRIMARY">Primario</option>
						<option value="SECONDARY">Secundario</option>
						<option value="TERTIARY">Terciario</option>
						<option value="UNIVERSITY">Universitario</option>
					</select>

					<input
						type='text'
						name='address'
						placeholder='Dirección'
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='text'
						name='phone'
						placeholder='Teléfono'
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='text'
						name='website'
						placeholder='Sitio web'
						className={inputField}
						onChange={handleChange}
					/>
					<button type='submit' className={submitButton}>
						Registrarse
					</button>
				</form>
			</div>

			<Footer />
		</div>


	);
};

export default Register;
