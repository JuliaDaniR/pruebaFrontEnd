import { InputControl } from '../../components/FormControls/InputControl';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { AddEditDeviceForm } from '../../models/AddEditDeviceForm';
import { RadioGroupControl } from '../../components/FormControls/RadioGroupControl';
import { SelectControl } from '../../components/FormControls/SelectControl';
import { deviceCategoriesOptions } from '../../helpers/deviceCategories';
import { deviceStatusOptions } from '../../helpers/deviceStatusOptions';

interface AddEditUsersInputsProps {
  register: UseFormRegister<AddEditDeviceForm>,
  errors: FieldErrors<AddEditDeviceForm>,
}

const nameRegisterOptions: RegisterOptions<AddEditDeviceForm> = {
  required: {
    message: 'Nombre necesario',
    value: true,
  },
  minLength: {
    message: 'Nombre debe tener al menos 4 carácteres',
    value: 4,
  },
  maxLength: {
    message: 'Nombre debe tener como mucho 25 carácteres',
    value: 25,
  },
}
const descriptionRegisterOptions: RegisterOptions<AddEditDeviceForm> = {
  required: {
    message: 'Descripción necesaria',
    value: true,
  },
  minLength: {
    message: 'Descripción debe tener al menos 5 carácteres',
    value: 5,
  },
  maxLength: {
    message: 'Descripción debe tener como mucho 50 carácteres',
    value: 50,
  },
}
const categoryRegisterOptions: RegisterOptions<AddEditDeviceForm> = {
  required: {
    message: 'Categoría necesaria',
    value: true,
  },
}
const availableRegisterOptions: RegisterOptions<AddEditDeviceForm> = {
  required: {
    message: 'Elección necesaria de disponibilidad',
    value: true,
  },
}

const AddEditDeviceInputs = (
  { register, errors }: AddEditUsersInputsProps
) => {
  return (
    <>
      <InputControl
        register={register}
        propertyName='name'
        commonName='Nombre'
        registerOptions={nameRegisterOptions}
        errors={errors}
      />
      <SelectControl
        register={register}
        propertyName='category'
        commonName='Categoría'
        registerOptions={categoryRegisterOptions}
        options={deviceCategoriesOptions}
        errors={errors}
      />
      <InputControl
        register={register}
        propertyName='description'
        commonName='Descripción'
        registerOptions={descriptionRegisterOptions}
        errors={errors}
      />
      <RadioGroupControl
        register={register}
        propertyName='isAvailable'
        commonName='Disponible'
        errors={errors}
        registerOptions={availableRegisterOptions}
        options={deviceStatusOptions}
      />
    </>
  )
}

export {
  AddEditDeviceInputs,
}
