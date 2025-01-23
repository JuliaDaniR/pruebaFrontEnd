import { GenericCard, GenericCardWithoutOnDelete } from '../../components/GenericCard/GenericCard';

interface InventoryCardGridProps {
  cards: GenericCardWithoutOnDelete[];
}

const handleDeleteCard = (
  itemKeyToDelete: number
) => {
  // Delete Logic
  console.log(itemKeyToDelete);
}

const InventoryCardGrid = (
  { cards }: InventoryCardGridProps
) => {
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
                key={card.itemKey}
                itemKey={card.itemKey}
                description={card.description}
                redirectToEditPathString={card.redirectToEditPathString}
                title={card.title}
                onDeleteEvent={handleDeleteCard}
              />
            )
          })
        }
        
      </div>
    </>
  )
}

export default InventoryCardGrid