import fetch from "node-fetch";
import { promises as fs } from "fs";
import path from "path";
import IChampionRoleData from "../models/IChampionRoleData";

export async function getUggVersion() {
    const url = "https://u.gg/lol/tier-list";

    const res = await fetch(url);
    const text = await res.text();

    const regex = new RegExp("Patch (\\d+\\.\\d+)");

    return regex.exec(text)![1].split(".").slice(0, 2).join("_");
}

export async function getAllUggChampionData(version, championData) {
    const championRoleData: IChampionRoleData[][] = await Promise.all(
        championData.map((c) => getUggChampionInfo(version, c.key))
    );

    return championRoleData.reduce((a, b) => [...a, ...b], []);
}

export async function saveAllUggChampionInfo(json) {
    await fs.writeFile(
        path.join(
            __dirname,
            "..",
            "..",
            "data",
            "dynamic",
            "championRoleData.json"
        ),
        JSON.stringify(json)
    );
}

async function getUggChampionInfo(version, championId) {
    const url = `https://stats2.u.gg/lol/1.1/overview/${version}/ranked_solo_5x5/${championId}/1.4.0.json`;

    const res = await fetch(url);
    const json = await res.json();

    // Data is plat+ (10) World (12)
    const dataByRole = json[12][10];

    const roleData: IChampionRoleData[] = [];

    for (const role of Object.keys(dataByRole)) {
        const data = dataByRole[role][0];

        const wrData = data[6];

        const wins = wrData[0];
        const matches = wrData[1];

        roleData.push({
            championId: +championId,
            wins,
            matches,
            role: +role,
        });
    }

    return roleData;
}
