import { FormPrinterUi } from "../ui/crud/formPrinterUi.js"


export class CrudPrinterPage {
    constructor() {
        this.table = document.getElementById('form-crud-printer');

        this.formUi = new FormPrinterUi(this.table);
    }
}