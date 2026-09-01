import { printerState } from './printerState.js'


function getTblHeaderFields(table) {
    const fields = Array()
    // const table =  document.getElementById('tbl-printers');
    const thead_line = table.querySelectorAll('thead tr th');

    thead_line.forEach(element => {
        fields.push(element.textContent);
    });
    return fields
}


function updateVisibility(element){
    const visibility = getComputedStyle(element).visibility;
    if (visibility === 'hidden') {
        element.style.visibility = 'visible';
    } else {
        element.style.visibility = 'hidden';
    }
}


function updateFieldsFilter(fieldsList) {
    const fieldSelect = document.getElementById('field-filter');

    fieldsList.forEach(field =>{
        const newOption = document.createElement('option')
        newOption.value = fieldFilterMap[field] ?? field.toLowerCase();
        newOption.text = field

        fieldSelect.add(newOption)
    });
}


function updateFieldSelect(fieldSelect, fieldsList){
    fieldsList.forEach(field => {
        const newOption = document.createElement('option');

        newOption.value = fieldFilterMap[field] ?? field.toLowerCase();
        newOption.textContent = field;

        fieldSelect.add(newOption);
    });
}


function createValueTextInput() {
    const input = document.createElement('input');

    input.type = 'text';
    input.id = 'value-filter';

    document.getElementById('value-container').appendChild(input);
}


function createValueSelect(field) {
    const select = document.createElement('select');
    select.id = 'value-filter';

    const newOption = document.createElement('option');
    newOption.value = '';
    newOption.textContent = 'Selecione...';
    select.add(newOption);    

    const table = document.getElementById('tbl-printers');
    const headers = table.querySelectorAll('thead tr th');

    // Descobre o índice da coluna
    let columnIndex = -1;

    headers.forEach((header, index) => {
        if (header.textContent.trim() === field) {
            columnIndex = index;
        }
    });

    if (columnIndex === -1) {
        console.log(
            'Erro ao obter o index para a coleta dos valores da coluna em tbl-printers'
        );
        document
            .getElementById('value-container')
            .appendChild(select);
        return;
    }

    // Obtém os valores da coluna
    const rows = table.querySelectorAll('tbody tr');

    const values = Array.from(rows).map(row => {
        return row.cells[columnIndex]?.textContent.trim();
    });

    // Remove valores vazios e duplicados
    const uniqueValues = [...new Set(
        values.filter(value => value)
    )];

    // Preenche o select
    updateFieldSelect(select, uniqueValues);

    // Adiciona o select ao DOM
    document
        .getElementById('value-container')
        .appendChild(select);
}


function updateValueInput() {
    const field = document.getElementById('field-filter');
    
    const operator = document.getElementById('operator-filter').value;

    const container = document.getElementById('value-container');
    container.replaceChildren();

    console.log(field.value)
    
    
    if (!field.value || !operator) {
        return;
    }

    if (operator === 'igual') {
        console.log(operator)
        createValueSelect(field.options[field.selectedIndex].text);
    }
    else if (operator === 'contem') {
        console.log(operator)
        createValueTextInput();
    }
}


function getFilterValues() {
    const field = document.getElementById('field-filter').value;
    const operator = document.getElementById('operator-filter').value;
    const value = document.getElementById('value-filter').value;
    
    return {'field': field, 'operator': operator, 'value': value}
}


function resetFilterFields() {
    document.getElementById('field-filter').selectedIndex = 0;
    document.getElementById('operator-filter').selectedIndex = 0;

    document.getElementById('value-container').replaceChildren();

    updateVisibility(document.getElementById('filters-inputs'));
}


function createNewFilter() {
    if (document.getElementById('value-filter') === null){
        alert('Erro ao inserir novo filtro, valores incompletos!');
        return;
    }

    // obtém valor do filtro
    const filter = getFilterValues();
    console.log(filter);

    // adiciona no objeto table
    if (filter.value == '' || filter.value == '' || filter.operator == '') {
        alert('Erro ao inserir novo filtro, valores incompletos!');
        return;
    }

    // limpa e esconde a div novamente
    resetFilterFields();

    // adiciona o filtro na tabela
    printerState.addFilter(filter.field, filter.operator, filter.value);

    // atualiza tabela
    printerState.render();
    renderFilterList();


}


const fieldFilterMap = {
    'N° Serial': 'num_serial',
    'Modelo': 'model',
    'Filial': 'branch_current_id',
    'Status': 'status',
    'Ip': 'ip',
    'Contador': 'counter'
}


function createFilterElement(field, filter) {
    const item = document.createElement('div');

    const text = document.createElement('span');

    text.textContent =
        `${field} ${filter.operator} ${filter.value} `;

    const button = document.createElement('button');
    button.textContent = 'X';

    button.addEventListener('click', () => {
        printerState.deleteFilter(
            field,
            filter.operator,
            filter.value
        );

        printerState.render();
        renderFilterList();
    });

    item.append(text, button);

    return item;
}


function renderFilterList() {
    const container = document.getElementById('filters-list');

    container.replaceChildren();

    for (const field in printerState.filters) {
        const filters = printerState.filters[field];

        filters.forEach(filter => {
            container.appendChild(
                createFilterElement(field, filter)
            );
        });
    }
}
// EventListeners

document.getElementById('btn-new-filter')
    .addEventListener('click', () => {
        updateVisibility(document.getElementById('filters-inputs'));
});

document.getElementById('btn-apply-filter')
    .addEventListener('click', () => {
        createNewFilter()
});

document.getElementById('operator-filter').addEventListener('change', updateValueInput);
document.getElementById('field-filter').addEventListener('change', updateValueInput);


// main
const fieldsArray = getTblHeaderFields(document.getElementById('tbl-printers'));

updateFieldsFilter(fieldsArray);
renderFilterList();