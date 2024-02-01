import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext.jsx';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx'; 
import InfoTooltip from './InfoTooltip.jsx'
import ProtectedRouteElement from './ProtectedRouteElement.jsx';
import * as auth from '../utils/auth.jsx';
import responceOk from '../images/responce-ok.svg';
import responceError from '../images/responce-error.svg';
function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoginStatus, setLoginStatus] = React.useState(false);
  const [isTextLoginStatus, setTextLoginStatus] = React.useState('');
  const [isLogoLoginStatus, setLogoLoginStatus] = React.useState(null);
  const [ cards, setCards ] = React.useState([]);
  const [ email, setEmail ] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  function handleAuthorize(email, password) {
    auth.authorize(email, password)
    .then((data) =>{
      if (data.token) {
        localStorage.setItem('token', data.token);
        setEmail(email);
        handleLogin();
        navigate('/', {replace: true});
      }
    })
    .catch(() =>{
      setLoginStatus(true);
      setTextLoginStatus('Что-то пошло не так! Попробуйте ещё раз.')
      setLogoLoginStatus(responceError);
    })
  }
  function handleRegister(email, password) {
    auth.register(email, password)
    .then(() =>{
      // setLoggedIn(!res.error)
      setLoginStatus(true);
      setTextLoginStatus('Вы успешно зарегистрировались!')
      setLogoLoginStatus(responceOk);
      navigate('/sign-in', {replace: true});
    })
    .catch(() =>{
      setLoginStatus(true);
      setTextLoginStatus('Что-то пошло не так! Попробуйте ещё раз.!')
      setLogoLoginStatus(responceError);
    })
  }
  React.useEffect(() => {
    console.log(loggedIn);
    if (loggedIn) {
    api.getProfile()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }}, [loggedIn])
  React.useEffect(() => {
    handleTokenCheck()
  }, [])
  function handleTokenCheck() {
      const token = localStorage.getItem('token');
    if (token) {
      console.log('проверяю токен');
      auth.checkToken(token)
      .then((res) => {
        console.log(res);
        setEmail(res.email);
        handleLogin();
        navigate('/', {replace: true});
      })
    }
  }
  React.useEffect(() => {
    if (loggedIn) {
    api.getCards()
    .then((res) => {
      setCards(res.reverse());
      
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
}}, [loggedIn])
  function handleSignOut() {
    setEmail('');
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setLoginStatus(false)
    setSelectedCard(null)
  }
  function onCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
    api.setLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => { 
      console.log(`${err}`);
    }) } else {
      api.removeLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => { 
      console.log(`${err}`);
    }) } 
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id))
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }
  function handleUpdateUser(data) {
    api.editProfile(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups()
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }
  function handleUpdateAvatar(data) {
    api.setAvatar(data)
    .then((avatar) =>{
      setCurrentUser(avatar);
      closeAllPopups()
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }
  function handleAddPlace(data) {
    api.createCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }
  const handleLogin = () => {
    setLoggedIn(true);
  }
  return (
    < CurrentUserContext.Provider value={currentUser} >
      <> 
        <div className="body">
          <div className="page">
            <Header email={email} onSignOut={handleSignOut}/>
            <InfoTooltip onClose = {closeAllPopups} />
            <Routes>
              <Route path='/' element={<ProtectedRouteElement 
                element={Main} 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
                />  } />
              <Route path='/sign-up' element={<Register onRegister={handleRegister}/>}/>
              <Route path='/sign-in'  element={<Login handleLogin={handleLogin} handleTokenCheck={handleTokenCheck} onAuthorise={handleAuthorize}/>}/>
            </Routes>
        </div>
        <Footer />
        <InfoTooltip 
          isOpen={isLoginStatus}
          isTextStatus={isTextLoginStatus}
          onClose={closeAllPopups}
          onLogoStatus={isLogoLoginStatus}
        />
        <ImagePopup 
          card={selectedCard} 
          onClose = {closeAllPopups}
          />
        <AddPlacePopup 
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onAddPlace={handleAddPlace}/>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm 
          name="delete-card" 
          title="Вы уверены?" 
          textButton="Да" />
      </div>
    </>
  </CurrentUserContext.Provider>
  )
}

export default App
