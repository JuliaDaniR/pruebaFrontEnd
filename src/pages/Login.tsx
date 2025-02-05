import logo from '/logo-box.svg';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthProvider } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { routeList } from '../helpers/routeList';
import { findPathByRouteType } from '../helpers/findRole';

const mainContainer =
	'flex flex-col items-center justify-center h-screen bg-zinc-50';
const elementConteiner =
	'flex flex-col sm h-[350px] items-center justify-center border-2 border-sky-500 bg-sky-500 px-20 rounded-[5px] text-sky-500 font-normal text-base';
const inputContainer = 'flex flex-col';
const inputLabel = 'text-zinc-50 pl-1 pb-1 text-xl';
const inputElement =
	'sm h-11 px-4 mb-5 border-2 border-sky-500 rounded-[5px] text-zinc-600 font-normal focus:border-orange-500 focus:outline-none';
const buttonStyles =
	'flex justify-center w-[200px] px-6 py-3 my-2 bg-white text-sky-500 font-normal text-base tracking-wider rounded-[5px] hover:bg-zinc-50';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { user, loginUser, isLoggedIn, logoutIntentional } = useAuthProvider();
	const navigate = useNavigate();

	useEffect(() => {
		if (!logoutIntentional) {
			if (isLoggedIn && user) {
				navigate(`/${user?.role.toLowerCase()}-dashboard`);
			}
		}
	}, [isLoggedIn, navigate, user?.role, user, logoutIntentional]);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const loginData = { email, password };
			const { role } = await loginUser(loginData);
			const urlDashboard = findPathByRouteType(routeList, role);
			if (urlDashboard) {
				navigate(urlDashboard);
			} else {
				console.error('No se encontró una ruta para el rol:', role);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<Header />
			<div className={mainContainer}>
				<div className='flex align-middle'>
					<img src={logo} alt='logo box' className='h-[70px] fill-sky-500' />
					<h1 className='font-sans font-medium text-6xl mb-8 text-sky-500'>
						Class<span className='text-orange-400 italic'>Kit</span>
					</h1>
				</div>

				<form className={elementConteiner} onSubmit={handleLogin}>
					<div className={inputContainer}>
						<label className={inputLabel} htmlFor='email-user'>
							Correo:
						</label>
						<input
							className={inputElement}
							type='email'
							id='email-user'
							placeholder='correo@classkit.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<label className={inputLabel} htmlFor='password-user'>
							Contraseña:
						</label>
						<input
							className={inputElement}
							type='password'
							id='password-user'
							placeholder='contraseña'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<span className='mt-5'></span>
					<button type='submit' className={buttonStyles}>
						Acceder
					</button>
				</form>
			</div>

			<Footer />
		</div>
	);
};

export default Login;
