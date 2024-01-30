import deleteIcon from '../images/delete.svg'
import CurrentUserContext from '../contexts/CurrentUserContext.jsx';
import React from 'react';
function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card)
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__btn-like ${isLiked && 'card__btn-like_active'}` 
  );
  return (
    <article className="card" >
      <img className="card__image"  
      style={{ backgroundImage: `url(${props.card.link})`}} 
      onClick={handleCardClick}/>
      { isOwn && <img
      className="card__delete"
      src={deleteIcon}
      alt="Удалить"
      onClick={handleDeleteClick}
      />}
      <div className="card__info">
        <h2 className="card__name" >{props.card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
          <p className="card__like-value" >{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card