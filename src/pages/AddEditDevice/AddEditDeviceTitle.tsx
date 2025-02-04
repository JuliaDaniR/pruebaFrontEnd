interface AddEditDeviceTitleProps {
  deviceName: string | undefined,
}
const AddEditDeviceTitle = ({ deviceName }: AddEditDeviceTitleProps) => {

  return (
    <div className='
      text-2xl pb-3
      md:pb-8
    '>
      {
        deviceName
        ? `Editar dispositivo: ${deviceName}`
        : 'Agregar nuevo dispositivo'
      }
    </div>
  )
}

export {
  AddEditDeviceTitle,
}