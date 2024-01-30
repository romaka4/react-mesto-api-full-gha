import React from 'react';
import Card from './Card.jsx'
import CurrentUserContext from '../contexts/CurrentUserContext.jsx';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
    return (
      <main className="content">
        <section className="profile">
          <div onClick={props.onEditAvatar} 
          className="profile__image" 
          style={{ backgroundImage: `url(${currentUser.avatar})` }}  />
          <div className="profile__info">
            <p className="profile__name">{currentUser.name}</p>
            <button onClick={props.onEditProfile} className="profile__edit-btn" type="button" />
            <p className="profile__bio">{currentUser.about}</p>
          </div>
          <button onClick={props.onAddPlace} className="profile__add-btn" type="button" />
        </section>
        <section className="cards">
          { props.cards.map((card) => (
            < Card key={card._id} card={card}
            onCardClick={props.onCardClick} 
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
  )  
}

export default Main