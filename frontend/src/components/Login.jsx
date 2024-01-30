import React, {useState} from 'react';
function Login(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAuthorise(formValue.email, formValue.password)
  }
  return (
    <div className="auth">
      <form className='auth__form' onSubmit={handleSubmit}>
        <h2 className='auth__title'>Вход</h2>
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
        <button className='auth__submit' type="submit" onSubmit={handleSubmit}>Войти</button>
      </form>
    </div>
  )
}

export default Login;