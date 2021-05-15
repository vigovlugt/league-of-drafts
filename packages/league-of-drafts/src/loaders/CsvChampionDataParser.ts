import IChampionCompData from "../models/champion/IChampionCompData";
import { rankToNumber } from "../utils/rankUtils";

export default class CsvChampionDataParser {
    public static parse(csvData: any) {
        const data: { [name: string]: IChampionCompData } = csvData.reduce(
            (obj: { [name: string]: IChampionCompData }, c: any) => {
                obj[c.Champion] = {
                    name: c.Champion,
                    class: c.Class,
                    strengthByComp: {
                        Siege: rankToNumber(c.Siege),
                        Split: rankToNumber(c.Split),
                        Protect: rankToNumber(c.Protect),
                        Catch: rankToNumber(c.Catch),
                        Attack: rankToNumber(c.Attack),
                    },
                };

                return obj;
            },
            {}
        );

        return data;
    }
}
