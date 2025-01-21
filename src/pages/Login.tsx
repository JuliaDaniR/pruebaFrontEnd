import React from 'react';
import logo from '../assets/img/logo-box.svg';
import RedirectButton from '../components/RedirectButton';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const mainContainer = "flex flex-col items-center justify-center h-screen bg-zinc-50";
const elementConteiner = "flex flex-col sm h-[350px] items-center justify-center border-2 border-sky-500 bg-sky-500 px-20 rounded-[5px] text-sky-500 font-normal text-base";
const inputContainer = "flex flex-col";
const inputLabel = "text-zinc-50 pl-1 pb-1 text-xl"
const inputElement = "sm h-11 px-4 mb-5 border-2 border-sky-500 rounded-[5px] text-zinc-600 font-normal focus:border-orange-500 focus:outline-none";

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  //Lógica verificación - Quitar con endpoint de backend o refuncionalizar.
  let credential: string = '';
  const checkLogin = () => {
    if (email === 'andres@gmail.com' && password === '123') {
      // redirigir a admin
      //to={'/admin'} 
      return credential = 'admin';
    } if (email === 'profe@gmail.com' && password === '321') {
      // redirigir a user
      return credential = 'user';
    } if (email === '' || password === '') {
      // ventana modal campos obligatorios
      return credential = 'empty';
    } else {
      // ventana modal de usuario y contraseña incorrecta 
      return credential = 'error'
    }
  };
  checkLogin();

  return (
    <div>
      <Header />
      <div className={mainContainer}>

        <div className='flex align-middle'>
          <img src={logo} alt="logo box" className='h-[70px] fill-sky-500' />
          <h1 className="font-sans font-medium text-6xl mb-8 text-sky-500">Class<span className='text-orange-400 italic'>Kit</span></h1>
        </div>

        <div className={elementConteiner}>

          <div className={inputContainer}>
            <label className={inputLabel} htmlFor='email-user'>Correo:</label>
            <input
              className={inputElement} 
              type="email"
              id='email-user'
              placeholder='correo@classkit.com' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />

            <label className={inputLabel} htmlFor='password-user'>Contraseña:</label> 
            <input
              className={inputElement}
              type="password"
              id='password-user'
              placeholder="contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

          </div>

          <span className='mt-5'></span>
          <RedirectButton to={`/${credential}`}>Acceder</RedirectButton>

        </div>
      </div> 

      <Footer />
    </div>
  );
};

export default Login;

