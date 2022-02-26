import coffeeStore from "../../lib/coffeeStore"
const fetchStores = async (req, res) => {
    const { LatLong, limit } = req.query;
    const response = await coffeeStore(LatLong, limit)
    res.status(200).json(response);
}

export default fetchStores