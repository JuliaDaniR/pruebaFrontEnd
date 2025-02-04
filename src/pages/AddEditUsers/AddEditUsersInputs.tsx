import { InputControl } from '../../components/FormControls/InputControl';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { AddEditUsersForm } from '../../models/AddEditUsersForm';

interface AddEditUsersInputsProps {
  register: UseFormRegister<AddEditUsersForm>,
  errors: FieldErrors<AddEditUsersForm>,
}

const dniRegisterOptions: RegisterOptions<AddEditUsersForm> = {
  required: {
    message: 'Dni necesario',
    value: true,
  },
  minLength: {
    message: 'Dni tiene que ser 8 carácteres',
    value: 8,
  },
  maxLength: {
    message: 'Dni tiene que ser 8 carácteres',
    value: 8,
  },
}
const nameRegisterOptions: RegisterOptions<AddEditUsersForm> = {
  required: {
    message: 'Nombre completo necesario',
    value: true,
  },
  minLength: {
    message: 'Nombre completo tiene que tener al menos 5 carácteres',
    value: 5,
  },
  maxLength: {
    message: 'Nombre completo tiene que tener como mucho 50 carácteres',
    value: 50,
  },
}
const emailRegisterOptions: RegisterOptions<AddEditUsersForm> = {
  required: {
    message: 'Email necesario',
    value: true,
  },
  minLength: {
    message: 'Email tiene que tener al menos 5 carácteres',
    value: 5,
  },
  maxLength: {
    message: 'Email tiene que tener como mucho 40 carácteres',
    value: 40,
  },
}
const passwordRegisterOptions: RegisterOptions<AddEditUsersForm> = {
  required: {
    message: 'Contraseña necesaria',
    value: true,
  },
  minLength: {
    message: 'La contraseña por lo menos debe tener 7 carácteres',
    value: 7,
  },
  maxLength: {
    message: 'La contraseña debe tener como mucho 35 carácteres',
    value: 35,
  },
}

const AddEditUsersInputs = (
  { register, errors }: AddEditUsersInputsProps
) => {
  return (
    <>
      <InputControl
        register={register}
        propertyName='dni'
        commonName='DNI'
        registerOptions={dniRegisterOptions}
        errors={errors}
      />
      <InputControl
        register={register}
        propertyName='name'
        commonName='Nombre completo'
        registerOptions={nameRegisterOptions}
        errors={errors}
      />
      <InputControl
        register={register}
        propertyName='email'
        commonName='Email'
        registerOptions={emailRegisterOptions}
        errors={errors}
      />
      <InputControl
        register={register}
        propertyName='pass1'
        commonName='Contraseña'
        type='password'
        registerOptions={passwordRegisterOptions}
        errors={errors}
      />
      <InputControl
        register={register}
        propertyName='pass2'
        commonName='Confirmar contraseña'
        type='password'
        registerOptions={passwordRegisterOptions}
        errors={errors}
      />
    </>
  )
}

export {
  AddEditUsersInputs,
}