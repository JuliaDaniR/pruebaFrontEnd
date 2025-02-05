import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { controlClasses } from './controlClasses'
import { MultipleFormControlOption } from '../../helpers/MultipleFormControlOption';

interface RadioGroupControlProps<T extends FieldValues> {
  propertyName: Path<T>,
  register: UseFormRegister<T>,
  registerOptions: RegisterOptions<T>,
  errors: FieldErrors<T>,
  commonName: string,
  options: MultipleFormControlOption[],
}

const RadioGroupControl = <T extends FieldValues>(
  { commonName, options, propertyName, register, errors, registerOptions }: RadioGroupControlProps<T>
) => {
  const {
    controlContainerClasses,
    labelClasses,
    labelContainerClasses,
    radioInputContainerClasses,
    errorContainerClasses,
  } = controlClasses;

  return (
    <div className={controlContainerClasses}>
      <div className={labelContainerClasses}>
        <label className={labelClasses}>
          {commonName}:
        </label>
      </div>
      <div className='flex-1'>
        <div className={radioInputContainerClasses}>
          {
            options.map((option) => {
              return (
                <div
                  key={option.value}
                  className='sm:flex sm:flex-1'
                >
                  <label className='
                    text-lg pr-1
                    sm:self-center
                  '
                  >
                    {option.commonName}
                  </label>
                  <input
                    className='mt-1'
                    type='radio'
                    value={option.value}
                    {...register(propertyName, registerOptions)}
                  />
                </div>
              )
            })
          }
        </div>
        {

          errors[propertyName] ?
            <div className={errorContainerClasses}>
              {String(errors[propertyName]?.message) || `Error en ${commonName}`}
            </div>
            : <></>
        }
      </div>
    </div>
  )
}

export {
  RadioGroupControl,
}
