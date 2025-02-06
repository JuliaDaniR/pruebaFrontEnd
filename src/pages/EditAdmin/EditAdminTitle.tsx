export const EditAdminTitle = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className='text-5xl py-6 px-2 text-center text-sky-500 sm:pt-10 font-bold'>
				Editar Perfil: {children}
			</div>
		</>
	);
};
