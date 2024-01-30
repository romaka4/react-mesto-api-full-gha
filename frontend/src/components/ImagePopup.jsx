function ImagePopup(props) {
  return (
    <div className={`popup popup-by-image ${props.card ? `popup_opened` : ''}`}>
      <figure className="popup__img-container">
        <img className="popup__image" 
        src={ props.card ? props.card.link : '' }
        alt={ props.card ? props.card.name : '' }/>
        <button
          className="popup__close-icon popup__close-icon_type_image"
          type="button"
          onClick={props.onClose}
        />
        <figcaption className="popup__title-image" >{props.card ? props.card.name : ''}</figcaption>
      </figure>
    </div>
  )
}
export default ImagePopup