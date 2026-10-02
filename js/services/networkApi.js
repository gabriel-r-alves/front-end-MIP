import { fetchDataApi } from "./api.js";

export async function getAllNetworks() {
    const data = await fetchDataApi('networks/');
    // console.log(data);
    return data.networks_by_branch_id
}

export async function getNetworkById(network_id) {
    const data = await fetchDataApi(`networks/${network_id}`);
    return data
}