import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validateForm } from '../utils/validations';

const registerContainer = "flex flex-col items-center justify-center bg-zinc-50 px-4";
const formElement = "bg-white p-6 rounded-lg shadow-md w-full max-w-md my-10";
const inputField = "mb-4 p-2 border border-gray-300 rounded w-full";
const submitButton = "mt-6 bg-sky-500 text-white p-2 rounded w-full hover:bg-sky-400";

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
