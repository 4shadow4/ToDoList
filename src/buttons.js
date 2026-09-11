import deleteImageSRC from "../Images/icons8-löschen-50.png";
import deleteGifSRC from "../Images/icons8-löschen.gif";
import editImageSRC from "../Images/icons8-neu-erstellen-64.png";

function createDeleteButton() {
  const deleteButton = document.createElement("div");
  const deleteImage = document.createElement("img");
  const deleteGif = document.createElement("img");

  deleteImage.src = deleteImageSRC;
  deleteImage.classList.add("static-gif");
  deleteGif.src = deleteGifSRC;

  deleteButton.classList.add("deleteButton");
  deleteButton.appendChild(deleteImage);
  deleteButton.appendChild(deleteGif);

  return deleteButton;
}

function createEditButton() {
  const editButton = document.createElement("div");
  const editImage = document.createElement("img");

  editImage.src = editImageSRC;

  editButton.classList.add("editButton");
  editButton.appendChild(editImage);

  return editButton;
}

export { createDeleteButton, createEditButton };
