import React from 'react'
import '../index.css'
import SettingIcon from '../assets/SettingsIcon.svg'
import IranLogo from '../assets/Logoiranteam.svg'

export default function navbar() {
    return (
        <div className='Navbar'>
            <a className='SettingIcon' href='/'><img src={SettingIcon} alt="SettingIcon" /></a>
            <a className='Logo'><img src={IranLogo} alt="Logo" /></a>
        </div>
    )
}
