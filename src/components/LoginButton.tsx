import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    to: string;
    children: React.ReactNode;
}

const buttonStyles = "flex justify-center w-[200px] px-6 py-3 my-2 bg-sky-500 text-white font-normal text-base tracking-wider rounded-[5px] hover:bg-sky-400"

const LoginButton: React.FC<ButtonProps> = ({ to, children }) => {
    return(
        <Link to={to}>
            <button className={buttonStyles}>
                {children}
            </button>
        </Link>
    )
}
export default LoginButton;