import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import SintLogo from './assets/sintlogo.png'

export const Header = () => (
  <div>
    <h1>
      <img
        alt='Sinterklaas'
        className='sintlogo'
        src={SintLogo} />
      Sinterklaas bij de familie Rijk - 2016
    </h1>
    <IndexLink to='/' activeClassName='route--active'>
      Uitleg
    </IndexLink>
    {' · '}
    <Link to='/puzzle' activeClassName='route--active'>
      Doe de puzzel!
    </Link>
  </div>
)

export default Header
