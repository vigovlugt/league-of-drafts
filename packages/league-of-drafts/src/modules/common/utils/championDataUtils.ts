import championData from "@league-of-drafts/data/dataset/dataset.json";
import Role from "../../champion/Role";
import IChampionData from "../../champion/IChampionData";
import Constants from "../constants/Constants";

export function getChampionData(championId: string): IChampionData {
    let champion = championData.find((c) => c.id === championId);

    if (!champion) {
        champion = championData.find((c) => c.name === championId);
    }

    if (!champion) {
        throw new Error("Champion unknown: " + championId);
    }

    // @ts-ignore
    return champion;
}

export const totalMatches = championData
    .map((c) =>
        Object.keys(c.statsByRole).reduce(
            (n, role) => n + c.statsByRole[role as Role]!.matches,
            0
        )
    )
    .reduce((a, b) => a + b, 0);

function getChampionsByRole() {
    const minTotalMatches = (totalMatches * Constants.MIN_PICKRATE) / 10;

    const championsByRole = Object.keys(Role).reduce(
        (acc, role) => ({
            ...acc,
            [role]: [],
        }),
        {}
    ) as { [key in Role]: IChampionData[] };

    for (const champion of championData) {
        for (const role of Object.keys(Role)) {
            if (
                champion.statsByRole[role as Role] &&
                champion.statsByRole[role as Role]!.matches > minTotalMatches
            ) {
                championsByRole[role as Role].push(champion as IChampionData);
            }
        }
    }

    return championsByRole;
}

export const championsByRole = getChampionsByRole();
