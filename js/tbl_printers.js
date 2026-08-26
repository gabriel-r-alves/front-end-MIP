export class PrinterTable{
    constructor(tableId){ 
        this.table = document.getElementById(tableId);
        this.printers = [];
        this.resetFilter();
    }

    // Ok
    setData(data){
        this.printers = Array.isArray(data) ? data: []; // Valida se é um array
    }

    // Ok
    addRow(printer){
        const tbody = this.table.querySelector('tbody');
        const row = tbody.insertRow(0);

        row.insertCell().textContent = printer.num_serial;
        row.insertCell().textContent = printer.model;
        row.insertCell().textContent = printer.branch_current_id;
        row.insertCell().textContent = printer.status;
        row.insertCell().textContent = printer.ip;
        row.insertCell().textContent = printer.counter;
    }

    // Ok
    clear(){
        const tbody = this.table.querySelector('tbody');
        tbody.innerHTML = '';
    }

    // Ok
    render() {
        this.clear();

        const printers = this.getFilteredData();

        printers.forEach(printer => {
            this.addRow(printer);
        })
        console.log(this.filters)
    }

    // Metodos com/dos Filtros

    // Ok
    addFilter(field, value) {
        if (!this.filters[field]) {
            this.filters[field] = [];
        }

        if (!this.filters[field].includes(value)) {
            this.filters[field].push(value);
        }
    }

    // Ok
    removeFilter(field, value=null){
        if (!this.filters[field]){
            console.error('Erro ao tentativa de excluir filtro que não existe.')
            return;
        };


        if (value === null) {
            this.filters[field] = [];
            return;
        }

        const index = this.filters[field].indexOf(value);

        if (index > -1) {
            this.filters[field].splice(index, 1);
        }
    }

    // Ok
    resetFilter() {
        this.filters = {
            num_serial: [],
            model: [],
            branch_current_id: [],
            status: [],
            ip:[],
            counter:[]
        };
    }
    
    // finalizar
    getFilteredData(){
        return this.printers.filter(printer => {
            for (const field in this.filters) {
                const values = this.filters[field];

                if (values.length === 0) {
                    continue;
                }

                if (!values.includes(String(printer[field]))) {
                    return false;
                }                
            }
            return true;
        });
    }
}