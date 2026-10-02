export class FormPrinterUi {
    constructor(form, printerFormState) {
        this.form = form;
        this.printerFormState = printerFormState;

        this.selectBranchNative = this.form.querySelector('#branch_native_id');
        this.selectBranchCurrent = this.form.querySelector('#branch_current_id');
        this.selectNetwork = this.form.querySelector('#network_id');

        this.setupEvents();
    }

    
    setupEvents() {
        // Envio do forms
        this.form.addEventListener(
            'submit', async(event)=>{
                event.preventDefault();

                const formData = new FormData(this.form);

                const printer = Object.fromEntries(formData.entries());

                console.log(printer);
            }
        );

        // Alterou a filial da impressora
        this.selectBranchCurrent.addEventListener('change',(event)=> {
            this.populateNetworkSelect(event.currentTarget.value);
        });
    }


    startUpdateDataApi() {

    }


    resetNetworkSelect() {
        this.selectNetwork.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecione uma rede';

        this.selectNetwork.appendChild(defaultOption);
    }


    populateBranchSelect() {
        const branches = this.printerFormState.getBranches();

        // console.log(branches);
        branches.forEach(branch =>{
            // console.log(branch);
            const newOption = document.createElement('option');

            newOption.value = branch.id
            newOption.textContent = `${branch.id} ${branch.name}`;

            this.selectBranchNative.appendChild(newOption);
            this.selectBranchCurrent.appendChild(newOption.cloneNode(true));
        });
    }


    populateNetworkSelect(branch_id) {
        this.resetNetworkSelect();

        const networks = this.printerFormState.getNetworks();

        const branchNetworks = networks
            .filter(network => network.branch_id === parseInt(branch_id))
            .flatMap(branch => branch.networks);

        if (branchNetworks.length === 0) {
            return;
        }

        branchNetworks.forEach(network => {
            const newOption = document.createElement('option');

            newOption.value = network.id;
            newOption.textContent = network.description;

            this.selectNetwork.appendChild(newOption);
        });
            
    }
}