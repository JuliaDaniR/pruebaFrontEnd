const labelClasses = 'block text-sm text-sky-500';
const inputAndSelectClasses = 'w-full text-lg p-0.5 border-solid border border-sky-500 rounded-sm';

interface InventorySearchingFormProps {
  categories: string[];
}

const InventorySearchingForm = ({
  categories,
}: InventorySearchingFormProps) => {
  return (
    <>
      <form className='
        block
        lg:flex lg:justify-between lg:gap-12
      '>
        <div className='
          block
          sm:flex sm:justify-between sm:gap-5
          lg:flex-1
        '>
          <div className='
            py-2
            sm:flex-1
          '>
            <label className={labelClasses}>Nombre</label>
            <input
              className={inputAndSelectClasses}
              type="text"
            />
          </div>
          <div className='
            py-2
            sm:flex-1
          '>
            <label className={labelClasses}>Categoría</label>
            <select className={inputAndSelectClasses}>
              <option value="">Cualquier categoria</option>
              {
                categories.map(category => {
                  return (
                    <option key={category}>
                      {category}
                    </option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <div className='
          flex justify-center py-2
          lg:flex-0
        '>
          <button
            className='
              w-1/4 text-lg bg-sky-500 text-white rounded-sm p-1
              lg:w-full lg:self-end lg:px-6
            '
            type='submit'
          >
            Buscar
          </button>
        </div>
      </form>
    </>
  )
}

export {
  InventorySearchingForm,
}