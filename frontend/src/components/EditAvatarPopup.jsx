import PopupWithForm from './PopupWithForm.jsx';
import React from 'react';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      link: avatarRef.current.value
    })
  }
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);
  
  return (
    <PopupWithForm 
      name="avatar" 
      title="Обновить аватар" 
      textButton="Сохранить"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      >
        <div className="form__input-container" >
          <input
            type="url"
            className="form__item form__avatar-link"
            placeholder="Ссылка"
            name="link"
            id="avatar"
            minLength={2}
            required=""
            ref={avatarRef}
          />
          <span id="avatar-error" className="input-error" />
        </div>
      </PopupWithForm>
  )
}



export default EditAvatarPopup



