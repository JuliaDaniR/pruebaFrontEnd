import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validateForm } from '../utils/validations';
import logo from '/logo-box.svg';
import '../App.css';
import registerRequest from '../services/registerRequest';
import { UserRegister } from '../models/UserRegister';
import { useAuthProvider } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const registerContainer =
	'flex flex-col md:flex-row items-center justify-center gap-0 md:gap-10 lg:gap-20 bg-zinc-50 px-4 pt-16';
const formElement =
	'bg-white p-6 rounded-lg shadow-md w-full max-w-md my-10 z-10';
const inputField = 'mb-4 p-1.5 border border-gray-300 rounded w-full';
const submitButton =
	'mt-6 bg-sky-500 text-white p-2 rounded w-full hover:bg-sky-400';
const welcomeBoxContainer = 'flex flex-col gap-2 pl-0 md:pl-10';
const welcomeContainer = 'pt-10 md:pt-0';
const welcomeTextContainer = 'max-w-[500px]';
const leftText =
	'text-sky-500 text-center md:text-left font-sans text-5xl pb-4';
const leftTextSimple =
	'text-sky-500 font-sans text-md md:text-xl pb-4 px-10 md:px-0 text-justify leading-relaxed';
const passwordWrapper = 'relative mb-4';
const inputPassword = 'w-full p-1.5 border border-gray-300 rounded pr-10';
const eyeIcon =
	'absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer';

const Register: React.FC = () => {
	const initialFormData: UserRegister = {
		cue: '',
		name: '',
		educational_level: '',
		address: '',
		email: '',
		phone: '',
		website: '',
		dniAdmin: '',
		full_name_admin: '',
		email_admin: '',
		password_admin: '',
		password2_admin: '',
	};

	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const navigate = useNavigate();
	const { isLoggedIn, user, logoutIntentional } = useAuthProvider();

	useEffect(() => {
		if (!logoutIntentional) {
			if (isLoggedIn && user) {
				navigate(`/${user?.role.toLowerCase()}-dashboard`);
			}
		}
	}, [isLoggedIn, navigate, user?.role, user, logoutIntentional]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => {
			prevFormData[name as keyof UserRegister] = value;
			return { ...formData, [name]: value };
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errorMessage = validateForm(formData);

		if (errorMessage) {
			Swal.fire({
				icon: 'error',
				title: 'Error al registrarse:',
				text: errorMessage,
			});
			return;
		}

		try {
			await registerRequest(formData);
			navigate('/login');
		} catch (error) {
			console.error('Error al registrarse:', error);
		}
	};

	return (
		<div>
			<Header />

			<div className={registerContainer}>
				<div className={welcomeBoxContainer}>
					<div className={welcomeContainer}>
						<img
							src={logo}
							alt='classkit box logo'
							className='w-[600px] opacity-[0.05] fixed top-[20vh] left-10 z-0'
						/>
						<p className={leftText}>
							Bienvenido a Class
							<span className='text-orange-400 italic'>Kit</span>
						</p>
					</div>
					<div className={welcomeTextContainer}>
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
						required={true}
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='text'
						name='dniAdmin'
						placeholder='DNI'
						required={true}
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='email'
						name='email_admin'
						placeholder='Email'
						required={true}
						className={inputField}
						onChange={handleChange}
					/>

					{/* // PASSWORD */}
					<div className={passwordWrapper}>
						<input
							type={showPassword ? 'text' : 'password'}
							name='password_admin'
							placeholder='Contraseña'
							required
							className={inputPassword}
							onChange={handleChange}
						/>
						<div
							className={eyeIcon}
							onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</div>
					</div>

					{/* PASSWORD CONFIRM */}
					<div className={passwordWrapper}>
						<input
							type={showConfirmPassword ? 'text' : 'password'}
							name='password2_admin'
							placeholder='Confirmar Contraseña'
							required
							className={inputPassword}
							onChange={handleChange}
						/>
						<div
							className={eyeIcon}
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
							{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
						</div>
					</div>

					<h2 className='text-2xl font-medium mb-6 text-sky-500'>
						Datos de Institución
					</h2>
					<input
						type='text'
						name='name'
						placeholder='Institución'
						required={true}
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='text'
						name='cue'
						placeholder='CUE'
						required={true}
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='email'
						name='email'
						placeholder='Email'
						required={true}
						className={inputField}
						onChange={handleChange}
					/>
					<select
						name='educational_level'
						className={inputField}
						onChange={handleChange}
						value={formData.educational_level}
						required>
						<option value='' disabled>
							Selecciona nivel educativo
						</option>
						<option value='PRIMARY'>Primario</option>
						<option value='SECONDARY'>Secundario</option>
						<option value='TERTIARY'>Terciario</option>
						<option value='UNIVERSITY'>Universitario</option>
					</select>

					<input
						type='text'
						name='address'
						placeholder='Dirección'
						required={true}
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='text'
						name='phone'
						placeholder='Teléfono'
						required={true}
						className={inputField}
						onChange={handleChange}
					/>
					<input
						type='text'
						name='website'
						placeholder='Sitio web'
						required={false}
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
