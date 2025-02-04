import { ButtonPropsAdminHome } from '.';

const AdminHomeButton: React.FC<ButtonPropsAdminHome> = ({ onClick, text }) => {
	return (
		<div className='flex justify-center items-center my-8'>
			<button
				onClick={onClick}
				className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 ease-in-out'>
				{text}
			</button>
		</div>
	);
};

export default AdminHomeButton;
