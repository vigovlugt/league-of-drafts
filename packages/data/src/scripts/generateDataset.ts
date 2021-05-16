import ChampionDataLoader from "../loaders/ChampionDataLoader";
import { promises as fs } from "fs";
import path from "path";

async function saveChampionData(json) {
    await fs.writeFile(
        path.join(__dirname, "..", "..", "dataset", "dataset.json"),
        JSON.stringify(json)
    );
}

async function main() {
    const championData = await ChampionDataLoader.getChampionData();
    await saveChampionData(championData);
}

main();
