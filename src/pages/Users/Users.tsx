import { GenericCardWithoutOnDelete } from '../../components/GenericCard/GenericCard';
import { UserAddOne } from './UserAddOne';
import { UserCardGrid } from './UserCardGrid';
import { UsersSearchingForm } from './UsersSearchingForm';
import { UsersTitle } from './UsersTitle';

const experimentalCards: GenericCardWithoutOnDelete[] = [
  {
    itemKey: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis aliquid dolor? Delectus atque soluta esse labore non inventore',
    redirectToEditPathString: '/',
    title: 'Titulo 1',
  },
  {
    itemKey: 2,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis aliquid dolor? Delectus atque soluta esse labore non inventore',
    redirectToEditPathString: '/',
    title: 'Titulo 2',
  },
  {
    itemKey: 3,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis aliquid dolor? Delectus atque soluta esse labore non inventore',
    redirectToEditPathString: '/',
    title: 'Titulo 3',
  },
  {
    itemKey: 4,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis aliquid dolor? Delectus atque soluta esse labore non inventore',
    redirectToEditPathString: '/',
    title: 'Titulo 4',
  },
  {
    itemKey: 5,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis aliquid dolor? Delectus atque soluta esse labore non inventore',
    redirectToEditPathString: '/',
    title: 'Titulo 5',
  },
  {
    itemKey: 6,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis aliquid dolor? Delectus atque soluta esse labore non inventore',
    redirectToEditPathString: '/',
    title: 'Titulo 6',
  },
]

const Users = () => {
  return (
    <>
      <div className='
        px-2
        sm:px-6
      '>
        <UsersTitle />
        <UsersSearchingForm />
        <UserCardGrid cards={experimentalCards} />
      </div>

      <UserAddOne />
    </>
  )
}

export {
  Users,
}
