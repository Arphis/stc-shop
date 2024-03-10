const imagePickerElement = document.querySelector('#image-upload-control input');
const imagePreviewElement = document.querySelector('#image-upload-control img');

function updateImagePreview() {
const files = imagePickerElement.files;

if (!files || files.length === 0) {//if file was picked but user deselected that
    imagePreviewElement.style.display = 'none';
    return;
}

const pickedFile = files[0];

imagePreviewElement.src = URL.createObjectURL(pickedFile); //JS built-in class that gives us way of constructing url to local files that have been provided by visitors of our site
imagePreviewElement.style.display = 'block';

}

imagePickerElement.addEventListener('change', updateImagePreview)