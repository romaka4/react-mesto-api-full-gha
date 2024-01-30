function PopupWithForm(props) {
  return(
  <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ''}`}>
    <div className="popup__popup-container">
      <button className="popup__close-icon" type="button" onClick={props.onClose}/>
      <form className={`form form_type_${props.name}`} name="{props.name}" onSubmit={props.onSubmit}>
        <h2 className="form__heading form__heading_delete">{props.title}</h2>
          {props.children}
        <button className="popup__save-btn" type="submit">
          {props.textButton}
        </button>
      </form>
    </div>
  </div>
  )
}

export default PopupWithForm