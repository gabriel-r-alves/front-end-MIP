import { PrinterTableUI } from "../ui/printers/printerTblUI.js";
import { FilterPrinterUI } from "../ui/printers/filterPrinterUI.js";
import { FilterPrinter } from "../models/printers/FilterPrinter.js";
import { PrinterState } from "../models/printers/printerState.js";
import { getAllPrinters } from "../services/printerApi.js";


export class PrinterPage {
    constructor() {
        this.table = document.getElementById('tbl-printers');
        
        this.printers = new PrinterState([]) // Inicializando vazio inicialmente e att no init
        this.printerUi = new PrinterTableUI(this.table);
        
        this.filters = new FilterPrinter();        
        this.filterUi = new FilterPrinterUI(this.filters, this.printers, this.table);
        this.filterUi.onFilterChange = () => this.renderTable();
    }


    async init() {
        this.setupEvents();
        await this.loadPrinters();
        this.startAutoUpdate();
    }


    setupEvents() {
        const updateTableBtn = document.getElementById("btn-update-tbl-printers");

        updateTableBtn.addEventListener("click", () => {
            this.loadPrinters();
        });
    }


    async loadPrinters() {
        this.printers.setPrinters(await getAllPrinters());
        
        try {
            // this.printerUi.showLoading();
            const allPrinters = this.printers.getPrinters();
            this.renderTable(allPrinters);

            this.filterUi.populateFieldSelect()
        } catch (error) {
            this.printerUi.showError(error.message);
        } finally {
            // this.printerUi.hideLoading();
        }
        console.log("Tabela atualizada!");
    }


    renderTable(printers = this.printers.getPrinters()) {
        const visiblePrinters = this.filters.apply(printers);

        this.printerUi.render(visiblePrinters);
    }


    startAutoUpdate() {
        const update = async () => {
            await this.loadPrinters();

            setTimeout(
                update,
                5 * 60 * 1000
            );
        };

        setTimeout(
            update,
            5 * 60 * 1000
        );
    }
}
