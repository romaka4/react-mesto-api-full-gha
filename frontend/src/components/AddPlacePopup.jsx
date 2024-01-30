import PopupWithForm from './PopupWithForm.jsx';
import React from 'react';

function AddPlacePopup(props) {

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [props.isOpen]);

  
  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }
  
  return (
    <PopupWithForm 
        name="new-place" 
        title="Новое место" 
        textButton="Создать" 
        isOpen = {props.isOpen}
        onClose = {props.onClose}
        onSubmit = {handleAddPlaceSubmit}
        >
          <>
            <div className="form__input-container">
              <input
                type="text"
                className="form__item form__item_el_title"
                placeholder="Название"
                name="name"
                id="title"
                minLength={2}
                maxLength={30}
                required=""
                ref={nameRef}
              />
              <span id="title-error" className="input-error" />
            </div>
            <div className="form__input-container">
              <input
                type="url"
                className="form__item form__item_el_link"
                placeholder="Ссылка на картинку"
                name="link"
                id="link"
                required=""
                ref={linkRef}
              />
              <span id="link-error" className="input-error" />
            </div>
          </>
      </PopupWithForm>
  )
}

export default AddPlacePopup