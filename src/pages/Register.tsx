import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validateForm } from '../utils/validations';
import logo from '../assets/img/logo-box.svg';

const registerContainer = "flex items-center justify-center gap-20 bg-zinc-50 px-4 pt-16";
const formElement = "bg-white p-6 rounded-lg shadow-md w-full max-w-md my-10";
const inputField = "mb-4 p-1.5 border border-gray-300 rounded w-full";
const submitButton = "mt-6 bg-sky-500 text-white p-2 rounded w-full hover:bg-sky-400";
const leftText = "text-sky-500 font-sans text-5xl pb-4";
const leftTextSimple = "text-sky-500 font-sans text-xl pb-4 text-justify leading-relaxed";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    email: '',
    password: '',
    confirmPassword: '',
    cue: '',
    institution: '',
    institutionType: '',
    educationLevel: '',
    address: '',
    phone: '',
    website: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorMessage = validateForm(formData);
    if(errorMessage){
      alert(errorMessage)
    } else {
      console.log('Datos del formulario:', formData);
      alert('Administrador registrado');
      navigate('/login');
    }

  };

  return (
    <div>

      <Header />
      
      <div className={registerContainer}>

        <div className='flex flex-col gap-2'>
          <div>
            <img src={logo} alt="classkit box logo" className='w-[600px] opacity-[0.05] fixed top-[20vh] left-10'/>
            <p className={leftText}>Bienvenido a Class<span className='text-orange-400 italic'>Kit</span></p>
          </div>
          <div className='max-w-[500px]'>
            <p className={leftTextSimple}>Optimiza la gestión de los recursos de tu institución en un solo lugar. Regístrate como administrador para comenzar a crear y gestionar tu inventario de manera eficiente. ¡Facilita el acceso a proyectores, mapas y más para tus profesores con solo unos clics!</p>
            <p className={leftTextSimple}>Completa el registro y transforma la forma en que administras los recursos educativos.</p>
          </div>
        </div>

        <form className={formElement} onSubmit={handleSubmit}>
          <h2 className="text-2xl font-medium mb-6 text-sky-500">Registrar Administrador</h2>
          <input type="text" name="fullName" placeholder="Nombre completo" className={inputField} onChange={handleChange} />
          <input type="text" name="dni" placeholder="DNI" className={inputField} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className={inputField} onChange={handleChange} />
          <input type="password" name="password" placeholder="Contraseña" className={inputField} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" className={inputField} onChange={handleChange} />
          <input type="text" name="cue" placeholder="CUE" className={inputField} onChange={handleChange} />
          <input type="text" name="institution" placeholder="Institución" className={inputField} onChange={handleChange} />
          <input type="text" name="institutionType" placeholder="Tipo de institución" className={inputField} onChange={handleChange} />
          <input type="text" name="educationLevel" placeholder="Nivel educativo" className={inputField} onChange={handleChange} />
          <input type="text" name="address" placeholder="Dirección" className={inputField} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Teléfono" className={inputField} onChange={handleChange} />
          <input type="text" name="website" placeholder="Sitio web" className={inputField} onChange={handleChange} />
          <button type="submit" className={submitButton}>Registrarse</button>
        </form>
      </div>
      
      <Footer />

    </div>
  );
};

export default Register;
