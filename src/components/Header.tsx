import React, { useState } from "react";
import logo from '../assets/img/logo-box-white.svg';
import { Link } from "react-router-dom";
import AboutModal from "./AboutModal";

const headerMainContainer = 'fixed flex items-center justify-between px-10 bg-sky-500 w-screen z-50';
const logoContainer = 'flex items-center';

const Header: React.FC = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return(
        <div className={headerMainContainer}>
            <Link to='/'>
                <div className={logoContainer}>
                    <img src={logo} alt="logo box" className='h-[40px]' />
                    <h1 className="font-sans font-medium text-3xl my-5 pl-1 text-zinc-50">Class<span className='text-zinc-50 italic'>Kit</span></h1>
                </div>
            </Link>
            <Link to='#' onClick={openModal}>
                <p className='text-zinc-50'>¿Qué es ClassKit?</p>
            </Link>
            {isModalOpen && <AboutModal onClose={closeModal}/>}
        </div>
    )
}
export default Header;