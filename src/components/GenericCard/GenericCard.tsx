import { useNavigate } from 'react-router-dom';
import WhiteWasteBasket from './../../assets/icons/white-wastebasket.svg';

interface GenericCardProps {
	itemKey: number;
	title: string;
	description: string;
	redirectToEditPathString: string;
	onDeleteEvent: (keyOfItemToDelete: number) => void;
}

type GenericCardWithoutOnDelete = Omit<GenericCardProps, 'onDeleteEvent'>;

const GenericCard = ({
	itemKey,
	title,
	description,
	redirectToEditPathString,
	onDeleteEvent,
}: GenericCardProps) => {
	const navigate = useNavigate();

	const onClickToEdit = () => {
		navigate(redirectToEditPathString);
	};

	const onClickToDelete = (keyOfItemToDelete: number) => {
		onDeleteEvent(keyOfItemToDelete);
	};

	return (
		<>
			{/* card */}
			<div
				className='
        p-3 border-solid border border-sky-500 bg-white 
      '>
				<div
					className='
          text-sky-500 text-xl
        '>
					{title}
				</div>
				<div
					className='
          text-sky-500 text-sm
        '>
					{description}
				</div>
				<div className='pt-4'>
					<div className='flex justify-between gap-3'>
						<button
							className='bg-sky-500 text-white text-lg p-2 rounded-sm flex-1'
							onClick={onClickToEdit}>
							Editar
						</button>
						<button
							className='bg-sky-500 text-white text-lg p-2 rounded-sm flex-0'
							onClick={() => onClickToDelete(itemKey)}>
							<img src={WhiteWasteBasket} />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export { GenericCard };
export type { GenericCardProps, GenericCardWithoutOnDelete };
