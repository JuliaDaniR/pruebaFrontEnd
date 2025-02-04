import React from 'react';
import { SidebarFirstOptions } from './SidebarFirstOptions';
import { SidebarLastOptions } from './SidebarLastOptions';

const Sidebar = () => {
	const optionClasses = `
    md:py-3 md:px-6 md:text-white cursor-pointer
  `;

	return (
		<React.Fragment>
			<aside
				className='
            hidden
            md:flex md:flex-col md:justify-between md:bg-sky-500 md:sticky md:self-start md:h-[calc(100vh-5rem)] md:w-1/4
          '>
				{/* FIRST OPTIONS */}
				<SidebarFirstOptions optionClasses={optionClasses} />

				{/* LAST OPTIONS */}
				<SidebarLastOptions optionClasses={optionClasses} />
			</aside>
		</React.Fragment>
	);
};

export { Sidebar };
