export class FormPrinterUi {
    constructor(form) {
        this.form = form

        this.setupEvents();
    }

    setupEvents() {
        this.form.addEventListener(
            'submit', async(event)=>{
                event.preventDefault();

                const formData = new FormData(this.form);

                const printer = Object.fromEntries(formData.entries());

                console.log(printer);
            }
        )
    }
}