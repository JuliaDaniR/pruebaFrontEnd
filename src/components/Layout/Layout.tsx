import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const Layout: React.FC = () => {
	return (
		<React.Fragment>
			{/* NAVBAR */}
			<Navbar />

			{/* FULL CONTENT */}
			<div
				className='
        flex bg-slate-50 h-min-screen
      '>
				{/* SIDEBAR (HIDDEN IN PHONES) */}
				<Sidebar />
				{/* MAIN CONTENT */}
				<main
					className='
          text-4xl w-full overflow-y-auto h-screen
          md:h-[calc(100vh-5rem)]
        '>
					<Outlet />
				</main>
			</div>
		</React.Fragment>
	);
};

export { Layout };
