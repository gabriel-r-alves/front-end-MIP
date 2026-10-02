import { fetchDataApi } from "./api.js";

export async function getAllBranches() {
    const data = await fetchDataApi('branches/');
    return data.branches
}


// export function getBranchById(branch_id) {    
// }


export async function getBranchNetworks(branch_id) {
    const data = await fetchDataApi(`branches/${branch_id}/networks`);
    return data.networks
}