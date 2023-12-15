const photos = document.querySelector(".photos");
const imgPopup = document.querySelector(".img-popup");
const imgPopupBackground = document.querySelector(".img-popup__background");
const imgPopupClose = document.querySelector(".img-popup__close");

const imgPopupPhoto = document.querySelector(".img-popup__photo");
const imgPopupTitle = document.querySelector(".img-popup__title");

const profileForm = document.querySelector(".edit-profile");
const editUserButton = document.querySelector(".profile__editButton");
const profileName = document.querySelector(".profile__info-name");
const profileAbout = document.querySelector(".profile__info-about");

const formAddImg = document.querySelector(".addimg");
const addNewImageButton = document.querySelector(".profile__addButton");
const addImgBackground = document.querySelector(".addimg__background");
const addImgClose = document.querySelector(".addimg__close");

const buttons = document.querySelectorAll(".form__submit");

const profileBackground = Array.from(
  document.querySelectorAll(".form__background")
);
const closeButton = Array.from(document.querySelectorAll(".form__close"));

const initialCards = [
  {
    name: "Geonosis",
    link: "https://lumiere-a.akamaihd.net/v1/images/databank_geonosis_01_169_1d04e086.jpeg?region=0%2C0%2C1560%2C878"
  },
  {
    name: "Coruscant",
    link: "https://i.pinimg.com/736x/6a/c2/4b/6ac24bf4379974e7ec1fdd94208fb9b3--star-wars-revan-fanfiction-stories.jpg"
  },
  {
    name: "Hoth",
    link: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/vintage-hoth-star-wars-travel-poster-edward-fielding.jpg"
  },
  {
    name: "Kamino",
    link: "https://i.pinimg.com/736x/a6/08/f8/a608f8a47a526cb63513690df75c20c4.jpg"
  },
  {
    name: "Mustafar",
    link: "https://globalgeeknews.com/wp-content/uploads/2012/10/Darth-Vader-in-Flames-Cake.jpg"
  },
  {
    name: "Tatooine",
    link: "https://i.pinimg.com/originals/a0/e2/a1/a0e2a1ec9362831ba88cba7fb784a862.jpg"
  }
];

const closePopupImage = () => {
  imgPopup.classList.remove("img-popup_activated");
};

const openPopupImage = () => {
  imgPopup.classList.add("img-popup_activated");
};

const setPopupImgAction = (btn) => {
  const photoImg = btn.querySelector(".photos__img");
  const photoTitle = btn
    .closest(".photos__content")
    .querySelector(".photos__title");

  btn.addEventListener("click", function () {
    imgPopupPhoto.src = photoImg.src;
    imgPopupTitle.textContent = photoTitle.textContent;
    openPopupImage();

    window.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        imgPopup.classList.remove("img-popup_activated");
      }
    });
  });
};

const openPostForm = () => {
  formAddImg.classList.add("addimage_is-opened");
};

const resetPostForm = () => {
  let fieldsReset = [titleInput, urlInput];

  fieldsReset.forEach((item) => {
    item.classList.remove("invalid");
    item.classList.remove("correct");
    item.nextElementSibling.classList.remove("empty-field_error");
  });
};

const closePostForm = () => {
  formAddImg.classList.remove("addimage_is-opened");
  resetPostForm();
  const fieldPost = document.querySelector(".addimg__inputs");
  fieldPost.reset();
};

const setTogglePost = () => {
  addNewImageButton.addEventListener("click", () => {
    openPostForm();
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePostForm();
    }
  });

  const addNewPost = document.querySelector(".addimg__inputs");
  addNewPost.addEventListener("submit", addNewPhoto);
};

const openProfileForm = () => {
  nameInput.value = profileName.textContent.trim();
  aboutInput.value = profileAbout.textContent.trim();
  profileForm.classList.add("edit-profile_open");
};

const resetProfile = () => {
  let fieldsReset = [nameInput, aboutInput];
  fieldsReset.forEach((item) => {
    item.classList.remove("invalid");
    item.classList.remove("correct");
    item.nextElementSibling.classList.remove("empty-field_error");
  });
  nameInput.value = profileName.textContent.trim();
  aboutInput.value = aboutInput.textContent.trim();
};

const closeProfileForm = () => {
  profileForm.classList.remove("edit-profile_open");
  resetProfile();
};

const setToggleProfile = () => {
  editUserButton.addEventListener("click", () => {
    openProfileForm();
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeProfileForm();
    }
  });

  const saveNewProfile = document.querySelector(".edit-profile__inputs");
  saveNewProfile.addEventListener("submit", saveProfile);
};

function setCloseForm(listClose) {
  listClose.forEach((item) => {
    item.addEventListener("click", () => {
      closePopupImage();
      closePostForm();
      closeProfileForm();
    });

    imgPopupBackground.addEventListener("click", closePopupImage);
    imgPopupClose.addEventListener("click", closePopupImage);
  });
}

function addPhoto(urlPhoto, namePhoto) {
  let photosTemplate = document.querySelector(".photos__template").content;
  let photoElement = photosTemplate
    .querySelector(".photos__content")
    .cloneNode(true);

  photoElement.querySelector(".photos__img").src = urlPhoto;
  photoElement.querySelector(".photos__img").alt = namePhoto;
  photoElement.querySelector(".photos__title").textContent = namePhoto;

  photos.prepend(photoElement);

  let imgDeletBtn = photoElement.querySelector(".photos__trash-btn");
  imgDeletBtn.addEventListener("click", function () {
    photoElement.remove();
  });

  let photoButton = photoElement.querySelector(".photos__imgPopup-btn");
  setPopupImgAction(photoButton);

  let photoLikeButton = photoElement.querySelector(".photos__like-img");
  photoLikeButton.addEventListener("click", (evt) =>
    evt.target.classList.toggle("photos__like-btn_activated")
  );
}

function addNewPhoto(evt) {
  evt.preventDefault();
  addPhoto(urlInput.value, titleInput.value);
  resetFieldstoFalse();
  closePostForm();
  resetPostForm();
  toggleButtonState();
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  resetFieldstoFalse();
  closeProfileForm();
  toggleButtonState();
}

initialCards.forEach((item) => addPhoto(item.link, item.name));

const listClose = profileBackground.concat(closeButton);
setCloseForm(listClose);

setTogglePost();
setToggleProfile();
