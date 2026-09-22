export class FilterPrinter {
    constructor() {
        this.filters = {
            num_serial: [],
            model: [],
            branch_current_id: [],
            status: [],
            ip: [],
            counter: []
        };
    }

    
    add(field, operator, value) {
        if (!this.filters[field]) {
            throw new Error(`Campo de filtro inválido: ${field}`);
        }

        const exists = this.filters[field].some(filter =>
            filter.operator === operator &&
            filter.value === value
        );

        if (!exists) {
            this.filters[field].push({
                operator,
                value
            });
        }
    }


    delete(field, operator, value) {
        if (!this.filters[field]) {
            throw new Error(`Campo de filtro inválido: ${field}`);
        }

        this.filters[field] = this.filters[field].filter(filter =>
            filter.operator !== operator ||
            filter.value !== value
        );
    }

    
    reset() {
        for (const field in this.filters) {
            this.filters[field] = [];
        }
    }

    
    getAll() {
        return structuredClone(this.filters);
    }


    apply(printers) {
        return printers.filter(printer => {
            for (const field in this.filters) {
                const filters = this.filters[field];

                if (filters.length === 0) {
                    continue;
                }

                const printerValue = String(
                    printer[field] ?? ""
                ).toLowerCase();

                const fieldMatches = filters.some(filter => {
                    const value = String(
                        filter.value
                    ).toLowerCase();

                    if (filter.operator === "igual") {
                        return printerValue === value;
                    }

                    if (filter.operator === "contem") {
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