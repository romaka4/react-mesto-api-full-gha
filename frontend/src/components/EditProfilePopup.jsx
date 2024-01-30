import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.jsx';
import PopupWithForm from './PopupWithForm.jsx';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen ]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

return (
      <PopupWithForm 
        name="edit" 
        title="Редактировать профиль" 
        textButton="Сохранить" 
        isOpen = {props.isOpen}
        onClose = {props.onClose}
        onSubmit = {handleSubmit}
        >
        <>
          <div className="form__input-container">
            <input
              type="text"
              className="form__item form__item_el_name"
              placeholder="Введите имя"
              name="name"
              id="name"
              value={name || ''}
              required=""
              minLength={2}
              maxLength={40}
              onChange={handleNameChange}
            />
            <span id="name-error" className="input-error" />
          </div>
          <div className="form__input-container">
            <input
              type="text"
              className="form__item form__item_el_job"
              placeholder="Введите деятельность"
              name="job"
              id="job"
              value={description || ''} 
              required=""
              minLength={2}
              maxLength={200}
              onChange={handleDescriptionChange} 
            />
            <span id="job-error" className="input-error" />
          </div>
        </>
      </PopupWithForm>
)}

export default EditProfilePopup