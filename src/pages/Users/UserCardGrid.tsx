import { GenericCard } from '../../components/GenericCard/GenericCard';
import { User } from '../../models/User';

interface UserCardGridProps {
  cards: User[];
  onDeleteUser: (dni: string) => void;
}

const UserCardGrid = (
  { cards, onDeleteUser }: UserCardGridProps
) => {
  const handleDeleteCard = (
    itemKeyToDelete: number
  ) => {
    // Delete Logic
    onDeleteUser(String(itemKeyToDelete));
  }

  return (
    <>
      <div className='
        grid grid-cols-1 gap-5 pt-10
        sm:grid-cols-2
        md:grid-cols-3
        2xl:grid-cols-4
      '>
        {
          cards.map(card => {
            return (
              <GenericCard
                key={card.dni}
                itemKey={Number(card.dni)}
                title={card.fullName || ''}
                description={card.nameSchool || ''}
                redirectToEditPathString={`/edit-user/${card.dni}`}
                onDeleteEvent={handleDeleteCard}
              />
            )
          })
        }

      </div>
    </>
  )
}

export {
  UserCardGrid,
}