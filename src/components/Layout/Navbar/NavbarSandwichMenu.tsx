import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route } from '../../../helpers/Route';
import { UseGetMenuRoutesForRoleUser } from '../../../helpers/hooks/useGetMenuRoutesForRoleUser';
import { UseGetMenuRoutes } from '../../../helpers/hooks/useGetMenuRoutes';

interface NavbarSandwichMenuProps {
	onToggleMenu: (value: false) => void;
}

const optionClasses = 'border-b border-gray-400 text-black py-3 text-center';

const NavbarSandwichMenu = ({ onToggleMenu }: NavbarSandwichMenuProps) => {
	const navigate = useNavigate();
	const getMenuRoutesForRoleUser = UseGetMenuRoutesForRoleUser;
	const getMenuRoutes = UseGetMenuRoutes;

	const [roleRoutes, setRoleRoutes] = useState<Route[]>([]);
	const [loggedRoutes, setLoggedRoutes] = useState<Route[]>([]);

	const handleRoleRoutesUpdate = (newRoutes: Route[]) => {
		setRoleRoutes(newRoutes);
	};
	const handleLoggedRoutesUpdate = (newRoutes: Route[]) => {
		setLoggedRoutes(newRoutes);
	};

	getMenuRoutesForRoleUser({ onUpdateRoutes: handleRoleRoutesUpdate });
	getMenuRoutes({
		menuType: 'USER',
		onUpdateRoutes: handleLoggedRoutesUpdate,
	});

	const onClickCloseMenu = () => {
		onToggleMenu(false);
	};
	const onClickRoute = (path: string) => {
		navigate(path);
		onToggleMenu(false);
	};

	return (
		<React.Fragment>
			<div
				className='
          absolute w-full top-0 left-0 bg-white z-10 flex flex-col justify-between items-center 
          md:hidden
        '>
				<div
					className='
            flex flex-col items-center justify-between w-full
          '>
					{/* CLOSE OPTION DIV */}
					<div
						className='
              text-black w-full flex justify-end bg-sky-500
              sm:h-20
            '>
						<a
							className='
                block px-2 w-14 h-14 text-center content-center text-2xl text-white
                sm:w-16 sm:h-16 sm:text-3xl sm:self-center
              '
							onClick={onClickCloseMenu}>
							X
						</a>
					</div>

					{/* ROUTE OPTION DIV */}
					{roleRoutes.concat(...loggedRoutes).map((route) => {
						return (
							<div
								key={route.path}
								className={optionClasses}
								onClick={() => onClickRoute(route.path)}>
								<a className='block'>{route.name}</a>
							</div>
						);
					})}
					<div className={optionClasses}>
						<a className='block'>Salir</a>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export { NavbarSandwichMenu };
