export const validateForm = (formData: {
    fullName: string;
    dni: string;
    email: string;
    password: string;
    confirmPassword: string;
    cue: string;
    institution: string;
    institutionType: string;
    educationLevel: string;
    address: string;
    phone: string;
    website: string;
  }): string | null => {
    const { fullName, dni, email, password, confirmPassword, cue, institution, institutionType, educationLevel, address, phone, website } = formData;
  
    if (!fullName.trim()) {
      return 'El nombre completo es obligatorio';
    }
  
    if (!dni.trim() || dni.length !== 8 || !/^\d+$/.test(dni)) {
      return 'El DNI es obligatorio y debe tener 8 caracteres numéricos';
    }
  
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return 'El email es obligatorio y debe tener un formato válido';
    }
  
    if (!password.trim() || password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      return 'La contraseña es obligatoria y debe tener al menos 8 caracteres, incluyendo letras, números y caracteres especiales';
    }
  
    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden';
    }
  
    if (!cue.trim() || !/^\d+$/.test(cue)) {
      return 'El CUE es obligatorio y debe contener solo números';
    }
  
    if (!institution.trim()) {
      return 'La institución es obligatoria';
    }
  
    if (!institutionType.trim()) {
      return 'El tipo de institución es obligatorio';
    }
  
    if (!educationLevel.trim()) {
      return 'El nivel educativo es obligatorio';
    }
  
    if (!address.trim()) {
      return 'La dirección es obligatoria';
    }
  
    if (!phone.trim() || !/^\d+$/.test(phone)) {
      return 'El teléfono es obligatorio y debe contener solo números';
    }
  
    if (website.trim() && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(website)) {
      return 'El sitio web debe tener un formato válido';
    }
  
    return null;
  };
  