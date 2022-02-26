
const { base } = require("../../lib/airtable");

const fetchById = async (req, res) => {
    try {
        if (!req.query.id) {
            res.json({ message: "provide a proper ID" });
            return
        }

        const { id } = req.query
        const response = base('CoffeeStores').select({
            filterByFormula: `id = "${id}"`
        }).firstPage();
        const results = await response;

        if (req.method === "POST") {
            res.json({ message: "invalid Method" })
        } else if (req.method === "GET") {
            res.json(results.map((data) => {
                return data.fields;
            })[0]);
        } else {
            res.status(405);
            res.json({ message: "Invalid Method" });
            return

        }
    } catch (error) {
        console.error({ "ran into a Problem": error })
        res.status(505);
    }
}

export default fetchById