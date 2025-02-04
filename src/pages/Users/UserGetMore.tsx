interface UserGetMoreProps {
  onClickMoreUsers: () => void;
}

export const UserGetMore = (
  { onClickMoreUsers }: UserGetMoreProps
) => {
  const clickMoreUsers = () => {
    onClickMoreUsers();
  }

  return (
    <div className='text-center'>
      <a className='text-sky-500 text-sm' onClick={clickMoreUsers}>
        Ver más usuarios
      </a>
    </div>
  )
}
