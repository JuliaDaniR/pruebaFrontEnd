import { controlClasses } from './controlClasses';

interface ControlLabelContainerProps {
  commonName: string
}

const ControlLabelContainer = (
  { commonName }: ControlLabelContainerProps
) => {
  const {
    labelContainerClasses,
    labelClasses,
  } = controlClasses;

  return (
    <div
      className={labelContainerClasses}>
      <label className={labelClasses}>
        {commonName}:
      </label>
    </div>
  )
}

export {
  ControlLabelContainer,
}