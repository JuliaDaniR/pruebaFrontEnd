import React from 'react'

interface NavbarSandwichButtonProps {
  onToggleMenu: (value: true) => void;
}

const NavbarSandwichButton = (
  { onToggleMenu }: NavbarSandwichButtonProps
) => {
  const onClickOpenMenu = () => {
    onToggleMenu(true);
  }

  return (
    <React.Fragment>
      <div
        className='
          w-10 h-10 space-y-2 content-center self-center
          md:hidden
        '
        onClick={onClickOpenMenu}
      >
        <span
          className='block h-0.5 w-8 bg-slate-50'
        ></span>
        <span
          className='block h-0.5 w-8 bg-slate-50'
        ></span>
        <span
          className='block h-0.5 w-8 bg-slate-50'
        ></span>
      </div>
    </React.Fragment>
  )
}

export {
  NavbarSandwichButton,
}