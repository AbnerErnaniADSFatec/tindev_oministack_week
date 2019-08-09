import React from 'react';
import './Login.css';
import logo from '../assets/logo';

export default function Login() {
    return (
        <div className = "login-container">
            <form>
                <img src = {logo} alt = "TinDev"/>
                <input placeholder = "Usuário Github"/>
                <button type = "submit">Enviar</button>
            </form>
        </div>
    );
}