import { fetchRecords } from "../../lib/airtable"

const fetchById = async (req,res) => {
    const { id } = req.query || req.body
    const response = await fetchRecords(id);
    res.json(response)
}

export default fetchById