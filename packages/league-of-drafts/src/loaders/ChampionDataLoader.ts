import CsvChampionDataParser from "./CsvChampionDataParser";
import IChampionCompData from "../models/champion/IChampionCompData";
import IChampionRoleData from "../models/champion/IChampionRoleData";
import IChampionSimpleData from "../models/champion/IChampionSimpleData";

// @ts-ignore
import championCompDataJson from "@league-of-drafts/data/static/championCompData.csv";
// @ts-ignore
import championRoleDataJson from "@league-of-drafts/data/dynamic/championRoleData.json";
// @ts-ignore
import simpleChampionDataJson from "@league-of-drafts/data/dynamic/champions.json";
import IChampionData from "../models/champion/IChampionData";
import Role from "../models/Role";
import IStats from "../models/champion/IStats";

let _championData: IChampionData[] | null = null;

export default class ChampionDataLoader {
    public static getChampionData() {
        if (_championData) {
            return _championData;
        }

        const championCompData: { [name: string]: IChampionCompData } =
            CsvChampionDataParser.parse(championCompDataJson);
        const championRoleData: IChampionRoleData[] = championRoleDataJson;
        const simpleChampionData: IChampionSimpleData[] =
            simpleChampionDataJson.map((c) => ({
                id: c.id,
                key: c.key,
                name: c.name,
            }));

        _championData = this.aggregateChampionData(
            championCompData,
            championRoleData,
            simpleChampionData
        );

        return _championData;
    }

    private static aggregateChampionData(
        championCompData: { [name: string]: IChampionCompData },
        championRoleData: IChampionRoleData[],
        simpleChampionData: IChampionSimpleData[]
    ) {
        const championData: IChampionData[] = [];

        for (const c of simpleChampionData) {
            const compData = championCompData[c.name];
            if (!compData) {
                console.log("Champion Missing:", c.name);
                continue;
            }

            const roleData = championRoleData.filter(
                (d) => d.championId === +c.key
            );

            const statsByRole: { [key in Role]?: IStats } = {};
            for (const data of roleData) {
                statsByRole[this.parseRole(data.role)] = {
                    wins: data.wins,
                    matches: data.matches,
                };
            }

            championData.push({
                id: c.id,
                key: c.key,
                name: c.name,
                class: compData.class,
                strengthByComp: compData.strengthByComp,
                statsByRole,
            });
        }

        return championData;
    }

    private static parseRole(roleNumber: number): Role {
        const map = new Map([
            [1, Role.Jungle],
            [2, Role.Support],
            [3, Role.Bottom],
            [4, Role.Top],
            [5, Role.Mid],
        ]);

        if (!map.has(roleNumber)) {
            throw new Error(`Role: ${roleNumber} not valid.`);
        }

        return map.get(roleNumber)!;
    }
}
