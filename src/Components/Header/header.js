import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {

    return(
        <div className="header">
            <nav>
                <ul>
                    <li><Link to='/'>Inicio</Link></li>
                    <li><Link to='/my-games'>Meus Jogos</Link></li>
                    <li><Link to='/account'>Minha Conta</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;