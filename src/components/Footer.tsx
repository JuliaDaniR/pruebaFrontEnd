import React from "react";

const footerMainContainer = "bg-sky-500 text-white py-1 flex justify-center";

const Footer: React.FC = () => {
    return(
        <div className={footerMainContainer}>
            <p className="text-center">© 2025 ClassKit. Todos los derechos reservados.</p>
        </div>
    )
}

export default Footer;