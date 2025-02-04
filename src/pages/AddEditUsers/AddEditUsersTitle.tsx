interface AddEditUsersTitleProps {
  userName: string | undefined,
}
const AddEditUsersTitle = ({ userName }: AddEditUsersTitleProps) => {

  return (
    <div className='
      text-2xl pb-3
      md:pb-8
    '>
      {
        userName
        ? `Editar ${userName}`
        : 'Agregar nuevo usuario'
      }
    </div>
  )
}

export {
  AddEditUsersTitle,
}