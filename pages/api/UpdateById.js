

import { fetchRecords, updateUsingId } from "../../lib/airtable"
const UpdateById = async (req, res) => {
    try {
        if (!req.body.id) {
            res.json({ message: "provide a proper ID" });
            return
        }
        const { id, votes } = req.body
        if(req.method==="PUT"){
            const response = await fetchRecords(id)
            if(response.length > 0){
                const result = await updateUsingId(id);
                res.json(result);
            }else {
                res.json({message:"Coffee Store ID Doesn't Exists"})
            }
        }
        else {
            res.json({message:"invalid Method"})
        }

    } catch (error) {
        console.error({ "ran into a Problem": error })
        res.status(505);
    }
}

export default UpdateById