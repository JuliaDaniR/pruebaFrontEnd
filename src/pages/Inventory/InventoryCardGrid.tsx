import { GenericCard } from '../../components/GenericCard/GenericCard';
import { Device } from '../../models/Device';

interface InventoryCardGridProps {
  cards: Device[];
  onDeleteDevice: (id: number) => void;
}


const InventoryCardGrid = (
  { cards, onDeleteDevice }: InventoryCardGridProps
) => {
  const handleDeleteCard = (
    itemKeyToDelete: number
  ) => {
    onDeleteDevice(itemKeyToDelete);
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
                key={card.id}
                itemKey={card.id || 0}
                description={card.description}
                redirectToEditPathString={`/edit-device/${card.id}`}
                title={card.name}
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
  InventoryCardGrid,
}