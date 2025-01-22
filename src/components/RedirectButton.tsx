import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
	to: string;
	children: React.ReactNode;
}

const buttonStyles =
	'flex justify-center w-[200px] px-6 py-3 my-2 bg-white text-sky-500 font-normal text-base tracking-wider rounded-[5px] hover:bg-zinc-50';

const RedirectButton: React.FC<ButtonProps> = ({ to, children }) => {
	return (
		<Link to={to}>
			<button className={buttonStyles}>{children}</button>
		</Link>
	);
};
export default RedirectButton;
