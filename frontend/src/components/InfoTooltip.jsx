
  function InfoTooltip(props) {
    return (
      <div className={`popup ${props.isOpen ? `popup_opened` : ''}`}>
    <div className="popup__popup-container">
      <button className="popup__close-icon" type="button" onClick={props.onClose}/>
      <img className="popup__logo-status" src={props.onLogoStatus} alt="" />
      <h2 className="popup__logo-text">{props.isTextStatus}</h2>
    </div>
  </div>
    )
 }
 export default InfoTooltip