import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const ModalCheckReservations: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
}) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-2xl shadow-lg w-[60%] p-6 relative'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-gray-500 hover:text-red-500'>
					<FaTimes size={20} />
				</button>

				<h2 className='font-semibold text-center mb-4 text-4xl text-sky-600 mb-4'>
					{title}
				</h2>
				<div className='text-gray-700'>{children}</div>
			</div>
		</div>
	);
};

export default ModalCheckReservations;
