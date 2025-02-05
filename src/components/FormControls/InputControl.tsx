import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { controlClasses } from './controlClasses'
import { ControlLabelContainer } from './ControlLabelContainer';
import { HTMLInputTypeAttribute } from 'react';

interface InputControlProps<T extends FieldValues> {
  propertyName: Path<T>,
  register: UseFormRegister<T>,
  registerOptions: RegisterOptions<T>,
  errors: FieldErrors<T>,
  commonName: string,
  type?: HTMLInputTypeAttribute,
}

const InputControl = <T extends FieldValues>(
  {
    register, propertyName,
    registerOptions, commonName,
    errors, type = 'text'
  }: InputControlProps<T>
) => {
  const {
    controlContainerClasses,
    textInputContainerClasses,
    textInputClasses,
    errorContainerClasses,
  } = controlClasses;

  return (
    <>
      <div className={controlContainerClasses}>
        <ControlLabelContainer commonName={commonName} />
        <div className={textInputContainerClasses}>
          <input
            className={textInputClasses}
            type={type}
            {...register(propertyName, registerOptions)}
          />
          {
            
            errors[propertyName] ?
            <div className={errorContainerClasses}>
              {String(errors[propertyName]?.message) || `Error en ${commonName}`}
            </div>
            : <></>
          }
        </div>
      </div>
      
    </>
  )
}

export {
  InputControl,
}
