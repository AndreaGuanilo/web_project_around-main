const postNewImageButton = document.querySelector(".addimg__btn");
const saveButtonProfile = document.querySelector(".edit-profile__btn");

const fields = {
  username: false,
  about: false,
  title: false,
  urlImagen: false,
};

const expresiones = {
  username: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras, numeros, guion y guion_bajo
  about: /^[a-zA-ZÀ-ÿ\s]{2,200}$/, // Letras y espacios, pueden llevar acentos.
  title: /^[a-zA-ZÀ-ÿ\s0-9\_\-]{2,30}$/,
};

const fieldsValidate = {
  username: nameInput,
  about: aboutInput,
  title: titleInput,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "username":
      validarCampo(expresiones.username, e.target, fieldsValidate.username);
      break;
    case "about":
      validarCampo(expresiones.about, e.target, fieldsValidate.about);
      break;
    case "title":
      validarCampo(expresiones.title, e.target, fieldsValidate.title);
      break;
    case "urlImagen":
      validateUrl(e.target);
      break;
  }
};

const validarCampo = (expresion, input, field) => {
  if (expresion.test(input.value.trim())) {
    field.classList.remove("invalid");
    field.classList.add("correct");
    input.nextElementSibling.classList.remove("empty-field_error");
    fields[field.name] = true;
    toggleButtonState();
  } else {
    field.classList.add("invalid");
    field.classList.remove("correct");
    input.nextElementSibling.classList.add("empty-field_error");
    fields[field.name] = false;
    toggleButtonState();
  }
};

const resetFieldstoFalse = () => {
  fields.title = false;
  fields.urlImagen = false;
  fields.username = false;
};

const buttonDisabled = () => {
  postNewImageButton.disabled = true;
  postNewImageButton.classList.remove("addimg__btn_activa");

  saveButtonProfile.disabled = true;
  saveButtonProfile.classList.remove("edit-profile__btn_activa");
};

const buttonActivated = () => {
  postNewImageButton.disabled = false;
  postNewImageButton.classList.add("addimg__btn_activa");

  saveButtonProfile.disabled = false;
  saveButtonProfile.classList.add("edit-profile__btn_activa");
};

const toggleButtonState = () => {
  if ((fields.username && fields.about) || (fields.title && fields.urlImagen)) {
    buttonActivated();
  } else {
    buttonDisabled();
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  toggleButtonState();

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", validarFormulario);
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(".form__inputs")
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

function validateUrl() {
  let urlfield = urlInput.value;
  var image = new Image();
  image.src = urlfield;

  image.addEventListener("load", () => {
    urlInput.classList.remove("invalid");
    urlInput.classList.add("correct");
    urlInput.nextElementSibling.classList.remove("empty-field_error");
    fields.urlImagen = true;
    toggleButtonState();
  });
  image.addEventListener("error", () => {
    urlInput.classList.add("invalid");
    urlInput.classList.remove("correct");
    urlInput.nextElementSibling.classList.add("empty-field_error");
    fields.urlImagen = false;
    toggleButtonState();
  });
}

enableValidation();
