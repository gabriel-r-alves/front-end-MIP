export class PrinterFormState {
    constructor() {
        this.printer = {};
        this.branches = [];
        this.networksByBranchId = [];
    }

    setBranches(branches) {
        this.branches = branches;
    }

    
    getBranches() {
        return this.branches;
    }


    setNetworks(networks) {
        this.networksByBranchId = networks;
    }

    getNetworks() {
        return this.networksByBranchId;
    }
}