export class PrinterTableUI{
    constructor(table) {
        this.table = table;
        // this.loading = document.querySelector("#loading"); // Ainda não implementado
    }

    render(printers) {
        this.clear();
        // console.log(printers)
        printers.forEach(printer => {
            this.addRow(printer);
        });
        
    }


    clear(){
        const tbody = this.table.querySelector('tbody');
        tbody.innerHTML = '';
    }


    addRow(printer){
        const tbody = this.table.querySelector('tbody');
        const row = tbody.insertRow();

        row.insertCell().textContent = printer.num_serial;
        row.insertCell().textContent = printer.model;
        row.insertCell().textContent = printer.branch_current_id;
        row.insertCell().textContent = printer.status;
        row.insertCell().textContent = printer.ip;
        row.insertCell().textContent = printer.counter;
    }


    // Implementar loading pendente
    showLoading() {
        this.loading.hidden = false;
    }

    // Implementar loading pendente
    hideLoading() {
        this.loading.hidden = true;
    }
    

    showError(message) {
        console.error(message);
    }
}