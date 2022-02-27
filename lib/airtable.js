
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

export const fetchRecords = async (id) => {
    const response = await base('CoffeeStores').select({
        filterByFormula: `id = "${id}"`
    }).firstPage();
    return await filterData(response);
}

export const createRecords = async ({ id, name, address, neighborhood, votes, imgUrl }) => {

    const Records = await base('CoffeeStores').create([
        {
            "fields": {
                "id": `${id}`,
                name,
                address,
                neighborhood: neighborhood[0] || "",
                votes: parseInt(votes) || 0,
                imgUrl,
            }
        },
    ]);
    if(Records.length > 0 ){
        return filterData(Records);
    }
    return []
}

const filterData = (response) => {
    const result = response.map(data => data.fields)
    return result;
}

