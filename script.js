function getFromApi(){
    const lista = [
        ["Serial_A", "Samsung", "22", "Online", "10.0.0.1"]
        , ["Serial_B", "Xerox", "22", "Online", "10.0.0.1"]
        , ["Serial_C", "Ricoh", "22", "Online", "10.0.0.1"]
        , ["Serial_D", "Conica", "22", "Online", "10.0.0.1"]
        , ["Serial_E", "HP", "22", "Online", "10.0.0.1"]
    ]

    fromList(lista)
}

function deleteLine(button){
    const line = button.closest('tr');
    // console.log(line)
    line.remove()
}


function readTblPrinters(){
    const table = document.getElementById('tbl-printers');
    console.log(table);
    const lines = table.querySelectorAll('tbody tr');
    
    lines.forEach(line => {
        var fields = line.querySelectorAll('td');
        fields.forEach(field=>{
            console.log(field.innerHTML);
        })
    });
}


function addRowTblPrinters(cell=["Serial_Teste", "Modelo_Teste", "0", "Online", "10.0.0.1"]) {
    const table = document.getElementById('tbl-printers');
    // console.log(table);
    
    const lines = table.querySelector('tbody');
    
    row = lines.insertRow(0);

    cell1 = row.insertCell(0);
    cell1.innerHTML = cell[0];
    cell2 = row.insertCell(1);
    cell2.innerHTML = cell[1];
    cell3 = row.insertCell(2);
    cell3.innerHTML = cell[2];
    cell4 = row.insertCell(3);
    cell4.innerHTML = cell[3];
    cell5 = row.insertCell(4);
    cell5.innerHTML = cell[4];
    cell6 = row.insertCell(5);
    cell6.innerHTML = "<button type='button' onclick='deleteLine(this)'> Exclude</button>";
}


function fromList(list=[]) {
    if (list.length != 0) {
        // console.log('Lista não vazia!', list.length)
        list.forEach(item=>{
            addRowTblPrinters(item)
        })
    }

    else {
        console.log('Lista vazia! ', list.length)
    }

}