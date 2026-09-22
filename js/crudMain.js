

const form = document.querySelector(".form-crud-create");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    // Objeto JavaScript
    const printer = Object.fromEntries(formData.entries());

    // JSON
    const printerJSON = JSON.stringify(printer);

    console.log(printerJSON);
});