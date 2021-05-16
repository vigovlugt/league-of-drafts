import path from "path";
import csv from "csvtojson";

import CsvChampionDataParser from "./CsvChampionDataParser";
import IChampionCompData from "../models/IChampionCompData";
import IChampionRoleData from "../models/IChampionRoleData";
import IChampionSimpleData from "../models/IChampionSimpleData";

// @ts-ignore
import championRoleDataJson from "../../data/dynamic/championRoleData.json";
// @ts-ignore
import simpleChampionDataJson from "../../data/dynamic/champions.json";
import IChampionData from "../models/IChampionData";
import Role from "../models/Role";
import IStats from "../models/IStats";
import Class from "../models/Class";

export default class ChampionDataLoader {
    public static async getChampionData() {
        const rawCompData = await this.getCompData();

        const championCompData: { [name: string]: IChampionCompData } =
            CsvChampionDataParser.parse(rawCompData);
        const championRoleData: IChampionRoleData[] = championRoleDataJson;
        const simpleChampionData: IChampionSimpleData[] =
            simpleChampionDataJson.map((c) => ({
                id: c.id,
                key: c.key,
                name: c.name,
            }));

        return this.aggregateChampionData(
            championCompData,
            championRoleData,
            simpleChampionData
        );
    }

    private static async getCompData() {
        return new Promise((resolve) => {
            const csvPath = path.join(
                __dirname,
                "../../data/static/championCompData.csv"
            );

            return csv()
                .fromFile(csvPath)
                .then((res) => resolve(res));
        });
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
                class: compData.class as Class,
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
