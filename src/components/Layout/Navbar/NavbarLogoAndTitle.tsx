import React from 'react';
import WhiteLogo from '../../../assets/img/logo-box-white.svg';


const NavbarLogoAndTitle = () => {
  return (
    <React.Fragment>
      <div className='flex'>
          <div className='content-center'>
            <img
              className='w-10 h-10'
              src={WhiteLogo}
            />
          </div>
          <div
            className='
              content-center pl-3 text-xl
              sm:text-2xl
              md:text-3xl
            '
          >
            ClassKit
          </div>
        </div>
    </React.Fragment>
  )
}

export {
  NavbarLogoAndTitle,
}