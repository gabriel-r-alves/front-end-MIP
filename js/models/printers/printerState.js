export class PrinterState{
    constructor(printers){
        this.printers = printers;
    }


    setPrinters(printers) {
        this.printers = printers;        
    }


    getPrinters() {
        return this.printers;
    }
}