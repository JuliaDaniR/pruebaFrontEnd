import React from 'react';
import { NavbarLogoAndTitle } from './NavbarLogoAndTitle';
import { NavbarCurrentRoute } from './NavbarCurrentRoute';
import { NavbarSandwich } from './NavbarSandwich';
import clsx from 'clsx';

const Navbar: React.FC = () => {
  /*const experimentalClasses = `
    sm:bg-red-500
    md:bg-yellow-500
    lg:bg-green-500
    xl:bg-violet-500
    2xl:bg-orange-500
  `;*/

  const navbarClasses = `
    bg-sky-500
    px-2 py-2 flex justify-between text-slate-50
    sm:h-20 sm:px-6 sm:py-0
  `;

  return (
    <nav
      className={clsx(
        navbarClasses,
        // experimentalClasses
      )}
    >
      {/* TITLE */}
      <NavbarLogoAndTitle />

      {/* CURRENT ROUTE */}
      <NavbarCurrentRoute />

      {/* SANDWICH MENU */}
      <NavbarSandwich />
    </nav>
  )
}

export {
  Navbar,
}
