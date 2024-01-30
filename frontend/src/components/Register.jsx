import {Link} from 'react-router-dom';
import React, {useState} from 'react';
function Register(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  }, [])
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(formValue.password, formValue.email)
  }
  return (
    <div className="auth">
      <form className='auth__form' onSubmit={handleSubmit}>
        <h2 className='auth__title'>Регистрация</h2>
        <input
              type="email"
              className="auth__input"
              placeholder="Email"
              name="email"
              id="email"
              required=""
              minLength={2}
              maxLength={40}
              value={formValue.email} 
              onChange={handleChange}
            />
            <input
              type="password"
              className="auth__input"
              placeholder="Пароль"
              name="password"
              id="password"
              required=""
              minLength={2}
              maxLength={40}
              value={formValue.password} 
              onChange={handleChange}
            />
        <button className='auth__submit' type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
      </form>
      <div className="auth__register-sign-in">
        <p>Уже зарегистрированы? </p>
        <Link to="/sign-in" className="auth__sign-in-link">Войти</Link>
      </div>
    </div>
  )
}
export default Register