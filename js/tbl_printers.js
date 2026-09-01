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
        // console.log(this.filters)
    }

    // Metodos com/dos Filtros

    // Ok
    addFilter(field, operator, value) {
        if (!this.filters[field]) {
            this.filters[field] = [];
        }

        if (!this.filters[field].includes(value)) {
            this.filters[field].push({
                operator,
                value
            });
        }
    }

    // Ok
    deleteFilter(field, operator, value){
        if (!this.filters[field]){
            console.error('Erro ao tentativa de excluir filtro que não existe.')
            return;
        };

        this.filters[field] = this.filters[field].filter(filter =>
            !(
                filter.operator === operator &&
                filter.value === value
            )
        );
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
    
    // Ok
    getFilteredData() {
        return this.printers.filter(printer => {
            for (const field in this.filters) {
                const filters = this.filters[field];

                if (filters.length === 0) {
                    continue;
                }

                const printerValue = String(printer[field]).toLowerCase();

                const fieldMatches = filters.some(filter => {
                    const value = String(filter.value).toLowerCase();

                    if (filter.operator === 'igual') {
                        return printerValue === value;
                    }

                    if (filter.operator === 'contem') {
                        return printerValue.includes(value);
                    }

                    return false;
                });

                if (!fieldMatches) {
                    return false;
                }
            }

            return true;
        });
    }
}