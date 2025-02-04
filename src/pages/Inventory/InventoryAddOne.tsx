import { useNavigate } from 'react-router-dom';

const InventoryAddOne = () => {
  const navigate = useNavigate();

  const onClickAddNew = () => {
    navigate('/add-device')
  }

  return (
    <>
      <div className='
        flex justify-center py-3
        sm:py-5
      '>
        <button
          className='bg-sky-500 text-white text-lg w-2/3 py-1'
          onClick={onClickAddNew}
        >
          Registrar Nuevo
        </button>
      </div>
    </>
  )
}

export {
  InventoryAddOne
}