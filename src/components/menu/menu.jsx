// .\components\menu\menu.jsx
import React from 'react';
import './menu.css'; // Asegúrate de crear un archivo CSS para los estilos

const Menu = () => {
    return (
        <nav className="app-menu">
            <ul className="app-menu-list">
                <li className="app-menu-item">Inicio</li>
                <li className="app-menu-item">Perfil</li>
                <li className="app-menu-item">Mensajes</li>
                <li className="app-menu-item">Configuración</li>
                <li className="app-menu-item">Cerrar sesión</li>
            </ul>
        </nav>
    );
};

export default Menu;
