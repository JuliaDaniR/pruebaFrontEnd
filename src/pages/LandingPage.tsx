import React, { useEffect } from 'react';
import logo from '/logo-box.svg';
import RedirectButton from '../components/RedirectButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuthProvider } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const mainContainer = 'flex flex-col min-h-screen bg-zinc-50';
const contentContainer = 'flex flex-col items-center justify-center flex-grow';
const buttonsContainer =
	'flex flex-col justify-center bg-sky-500 px-20 py-10 rounded-[5px]';

const LandingPage: React.FC = () => {
	const { user, isLoggedIn, logoutIntentional } = useAuthProvider();
	const navigate = useNavigate();
	useEffect(() => {
		if (!logoutIntentional) {
			if (isLoggedIn && user) {
				navigate(`/${user?.role.toLowerCase()}-dashboard`);
			}
		}
	}, [isLoggedIn, navigate, user?.role, user, logoutIntentional]);
	return (
		<div className={mainContainer}>
			<Header />

			<div className={contentContainer}>
				<div className='flex align-middle'>
					<img src={logo} alt='logo box' className='h-[70px] fill-sky-500' />
					<h1 className='font-sans font-medium text-6xl mb-8 text-sky-500'>
						Class<span className='text-orange-400 italic'>Kit</span>
					</h1>
				</div>

				<div className={buttonsContainer}>
					<RedirectButton to={'/register'}>Registrarse</RedirectButton>
					<RedirectButton to={'/login'}>Login</RedirectButton>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default LandingPage;
