import React from 'react';

const modalBackground = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50';
const modalContainer = 'bg-white p-6 rounded-lg shadow-lg w-full max-w-lg';

const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className={modalBackground} onClick={onClose}>
            <div className={modalContainer} onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-medium mb-4 text-sky-500">¿Qué es ClassKit?</h2>
                <p>ClassKit es una aplicación diseñada para facilitar la gestión de clases y la administración educativa. Con esta herramienta, los administradores y profesores pueden organizar y supervisar las actividades académicas de manera eficiente y efectiva.</p>
                <button onClick={onClose} className="mt-4 bg-sky-500 text-white p-2 rounded hover:bg-sky-400">Cerrar</button>
            </div>
        </div>
    );
};

export default AboutModal;
