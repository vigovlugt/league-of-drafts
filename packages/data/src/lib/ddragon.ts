import fetch from "node-fetch";
import { promises as fs } from "fs";
import path from "path";

export async function getVersion() {
    const url = "https://ddragon.leagueoflegends.com/api/versions.json";

    const res = await fetch(url);
    const json = await res.json();

    return json[0];
}

export async function getChampions(version) {
    const url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;

    const res = await fetch(url);
    const json = await res.json();

    return Object.values(json.data);
}

export async function saveChampions(json) {
    await fs.writeFile(
        path.join(__dirname, "..", "..", "data", "dynamic", "champions.json"),
        JSON.stringify(json)
    );
}
