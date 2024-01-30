import logo from '../images/header-logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
function Header(props) {
  return (
    <header className="header"> 
      <img
        src={logo}
        alt="Логотип"
        className="header__logo"
      />
      <Routes>
        <Route path='/' element={
          <div className='header__login'>
            <p className='header__email'>{props.email}</p>
            <p  className='header__link' onClick={props.onSignOut}>Выйти</p>
          </div>
        }/>
        <Route path='/sign-in' element={
          <div className='header__login'>
            <Link to='/sign-up'  className='header__link'>Регистрация</Link>
          </div>
        }/>
        <Route path='/sign-up' element={
          <div className='header__login'>
            <Link to='/sign-in'  className='header__link'>Войти</Link>
          </div>
        }/>
      </Routes>
    </header>
  )
}
export default Header