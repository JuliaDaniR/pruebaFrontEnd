import React, { useState } from 'react'
import { NavbarSandwichButton } from './NavbarSandwichButton';
import { NavbarSandwichMenu } from './NavbarSandwichMenu';

const NavbarSandwich = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handletoggleMenu = (value: boolean) => {
    setIsMenuOpened(value);
  }

  return (
    <React.Fragment>
      {
        !isMenuOpened
          ? <NavbarSandwichButton onToggleMenu={(value) => handletoggleMenu(value)} />
          : <NavbarSandwichMenu onToggleMenu={(value) => handletoggleMenu(value)} />
      }
    </React.Fragment>
  )
}

export {
  NavbarSandwich,
}
