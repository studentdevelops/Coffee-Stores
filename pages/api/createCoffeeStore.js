
import {base} from "../../lib/airtable"

const createCoffeeStore = async (req, res) => {
    try {
        if (!req.body.id) {
            res.json({ message: "Provide a proper ID", check: req.body });
            return
        }

        const { id } = req.body
        const response = base('CoffeeStores').select({
            filterByFormula: `id = "${id}"`
        }).firstPage();
        const results = await response;
        if (req.method === "POST") {
            if (results.length !== 0) {
                res.json(
                    results.map((data) => {
                        return data.fields;
                    })[0]);
                return
            } else {
                if (!req.body.name || !req.body.address || !`${req.body.votes}` || !req.body.imgUrl) {
                    res.json({
                        message: "Invalid Request",
                    });
                    return
                }
                const { name, address, neighborhood, votes, imgUrl } = req.body
                const createdRecord = await base('CoffeeStores').create([
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
            items: `${req.body.neighborhood}`
        });
    }

}

export default createCoffeeStore


