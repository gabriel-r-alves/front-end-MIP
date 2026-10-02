import { FormPrinterUi } from "../ui/crud/formPrinterUi.js"
import { PrinterFormState } from "../models/crud/printerFormState.js";
import { getAllNetworks } from "../services/networkApi.js";
import { getAllBranches } from "../services/branchApi.js";


export class CrudPrinterPage {
    constructor() {
        this.table = document.getElementById('form-crud-printer');
        
        this.printerFormState = new PrinterFormState();        
        this.formUi = new FormPrinterUi(this.table, this.printerFormState);
    }


    async init() {
        await this.loadData();
        this.startAutoUpdate();
    }


    startAutoUpdate() {
        const update = async () => {
            await this.loadData();

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


    async loadData() {
        const branchesData = await getAllBranches();
        
        // console.log(branchesData);
        
        if (branchesData.length == 0) {
            throw console.error('Lista de Branches vazia!');
        }
        
        this.printerFormState.setBranches(branchesData);

        const networksByBranchId = await getAllNetworks();
        // console.log(networksByBranchId);
        if (networksByBranchId.length == 0) {
            throw console.error('Erro ao obter NetworksByBranchId vazia!');
        }
        
        this.printerFormState.setNetworks(networksByBranchId);

        this.formUi.populateBranchSelect();
    }
}