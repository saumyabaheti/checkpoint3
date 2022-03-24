const button = document.querySelector('#clickable-button');


function onButtonClick() {
    document.getElementById("clicked-feedback").textContent = "This is a model XJJS10 telescope!";
}

button.addEventListener('click', onButtonClick);