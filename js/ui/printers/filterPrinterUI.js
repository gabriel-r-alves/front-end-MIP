export class FilterPrinterUI{
    constructor(filterPrinter, printersState, table) {
        this.filterPrinter = filterPrinter;
        this.table = table;
        this.printersState = printersState;

        this.fieldSelect = document.getElementById('field-filter');
        this.operatorSelect = document.getElementById('operator-filter');
        this.valueContainer = document.getElementById('value-container');
        this.filtersList = document.getElementById('filters-list');
        this.inputs = document.getElementById('filters-inputs');

        this.fieldFilterMap = {
            'N° Serial': 'num_serial',
            'Modelo': 'model',
            'Filial': 'branch_current_id',
            'Status': 'status',
            'Ip': 'ip',
            'Contador': 'counter'
        }

        this.setupEvents();
    }

    setupEvents() {
        document
            .getElementById('btn-new-filter')
            .addEventListener('click', () => {
                this.updateVisibility(
                    document.getElementById('filters-tbl-printers')
                );
        });

        document
            .getElementById('btn-apply-filter')
            .addEventListener('click', () => {
                this.createNewFilter();
        });

        this.operatorSelect.addEventListener(
            'change',
            () => {
                this.updateValueInput()
            }
        );

        this.fieldSelect.addEventListener(
            'change',
            () => this.updateValueInput()
        );
    }
    

    getTableFields() {
        const headers = this.table.querySelectorAll('thead th');

        return Array.from(headers)
            .map(header => header.textContent.trim());
    }


    populateFieldSelect(){
        this.fieldSelect.length = 1;

        const fields = this.getTableFields();

        fields.forEach(field => {
            const option = document.createElement('option');

            option.value = 
                this.fieldFilterMap[field] ?? field.toLowerCase();

            option.textContent = field;

            this.fieldSelect.appendChild(option);
        });
    }

    
    updateVisibility(element){
        const visibility = getComputedStyle(element).visibility;

        if (visibility === 'hidden') {
            element.style.visibility = 'visible';
        } else {
            element.style.visibility = 'hidden';
        }
    }


    updateFieldSelect(fieldSelect, valuesList){
        valuesList.forEach(value => {
            const newOption = document.createElement('option');

            newOption.value = value;
            newOption.textContent = value;

            fieldSelect.add(newOption);
        });
    }


    createValueTextInput() {
        const input = document.createElement('input');

        input.type = 'text';
        input.id = 'value-filter';

        document.getElementById('value-container').appendChild(input);
    }


    createValueSelect(field) {
        const select = document.createElement('select');
        
        const printers = this.printersState.getPrinters();
        const visiblePrinters = this.filterPrinter.apply(printers);
        select.id = 'value-filter';

        const newOption = document.createElement('option');
        newOption.value = '';
        newOption.textContent = 'Selecione...';
        select.add(newOption);

        const values = [
            ...new Set(
                visiblePrinters
                    .map(printer => printer[field])
                    .filter(value => value !== null && value !== undefined)
            )
        ];

        // Remove valores vazios e duplicados
        const uniqueValues = [...new Set(
            values.filter(value => value)
        )];

        // Preenche o select
        this.updateFieldSelect(select, uniqueValues);

        // Adiciona o select ao DOM
        document
            .getElementById('value-container')
            .appendChild(select);
    }


    updateValueInput() {
        this.valueContainer.replaceChildren();

        const field = this.fieldSelect;
        const operator = this.operatorSelect.value;
        
        // console.log(field, operator)

        if (!field.value || !operator) {
            return;
        }

        
        if (operator === 'igual') {
            this.createValueSelect(field.value);
        }
        
        if (operator === 'contem') {
            this.createValueTextInput();
        }
    }


    getFilterValues() {
        const field = this.fieldSelect.value;
        const operator = this.operatorSelect.value;
        const value = document.getElementById('value-filter').value;
        
        return {'field': field, 'operator': operator, 'value': value}
    }

    
    resetFilterFields() {
        document.getElementById('field-filter').selectedIndex = 0;
        document.getElementById('operator-filter').selectedIndex = 0;

        document.getElementById('value-container').replaceChildren();

        this.updateVisibility(
            document.getElementById('filters-tbl-printers')
        );
    }


    createNewFilter() {
        const filter = this.getFilterValues();

        if (!filter.value || !filter.field || !filter.operator) {
            alert("Erro ao inserir novo filtro, valores incompletos!");
            return;
        }

        this.filterPrinter.add(
            filter.field,
            filter.operator,
            filter.value
        );

        // limpa e esconde a div novamente
        this.resetFilterFields();
        this.renderFilterList();

        this.onFilterChange?.(); // trocar
    }

    // Adiciona no campo de filtros ativos, demonstra quais filtros estão ativos
    createFilterElement(field, filter) {
        const item = document.createElement('div');

        const text = document.createElement('span');

        text.textContent =
            `${field} ${filter.operator} ${filter.value} `;

        const button = document.createElement('button');
        button.textContent = 'X';

        button.addEventListener('click', () => {
            this.filterPrinter.delete(
                field,
                filter.operator,
                filter.value
            );

            this.renderFilterList();
            this.onFilterChange?.();
        });

        item.append(text, button);

        return item;
    }


    renderFilterList() {
        const container = document.getElementById('filters-list');
        const allFilters = this.filterPrinter.getAll();

        container.replaceChildren();

        for (const field in allFilters) {
            const filters = allFilters[field];

            filters.forEach(filter => {
                container.appendChild(
                    this.createFilterElement(field, filter)
                );
            });
        }
    }
}