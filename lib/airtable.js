
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
                neighborhood: neighborhood || " ",
                votes: parseInt(votes) || 0,
                imgUrl,
            }
        },
    ]);
    if (Records.length > 0) {
        return filterData(Records);
    }
    return []
}


export const updateUsingId = async (id) => {
    const response = await fetchRecords(id);
    const CalculateVotes = 1 + parseInt(response[0].votes)
    base('CoffeeStores').update(response[0].recordId, {
        "votes": CalculateVotes
    });
    return response;
}

const filterData = (response) => {
    const result = response.map((data) => {
        return {
            recordId: data.id,
            ...data.fields
        }
    })
    return result;
}

