
import {fetchRecords, createRecords} from "../../lib/airtable"

const createCoffeeStore = async (req, res) => {
    try {
        if (!req.body.id) {
            res.json({ message: "Provide a proper ID", check: req.body });
            return
        }

        const { id } = req.body
        const results = await fetchRecords(id);
        if (req.method === "POST") {
            if (results.length !== 0) {
                res.json(results);
                return
            } else {
                if (!req.body.name || !req.body.address || !`${req.body.votes}` || !req.body.imgUrl) {
                    res.json({
                        message: "Invalid Request",
                    });
                    return
                }

                const createRecorded = createRecords(req.body)
                res.json("record created");
                return

            }
        } else if (req.method === "GET") {
            res.json({ message: "Invalid Method" });

        } else {
            res.status(405);
            res.json({ message: "Invalid Method" });
            return

        }
    } catch (error) {
        console.error({ "ran into a Problem": error })
        res.status(505);
        res.json({
            message: "something went wrong",
            items: `${error}`,
            file: "createCoffeeStore"
        });
    }

}

export default createCoffeeStore


