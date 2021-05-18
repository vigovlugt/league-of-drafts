import IChampionData from "./IChampionData";
import Role from "./Role";
import IStats from "../common/models/IStats";
import CompType from "../comptype/CompType";
import Class from "./Class";
import Constants from "../common/constants/Constants";
import { totalMatches } from "../common/utils/championDataUtils";

export default class Champion implements IChampionData {
    class: Class;
    id: string;
    key: string;
    name: string;
    statsByRole: { [key in Role]?: IStats };
    strengthByComp: { [key in CompType]: number };

    constructor(championData: IChampionData) {
        if (!championData) {
            throw new Error("ChampionData is null");
        }

        this.class = championData.class;
        this.id = championData.id;
        this.key = championData.key;
        this.name = championData.name;
        this.statsByRole = championData.statsByRole;
        this.strengthByComp = championData.strengthByComp;
    }

    getRoles() {
        const minTotalMatches = (totalMatches * Constants.MIN_PICKRATE) / 10;

        return Object.keys(this.statsByRole)
            .filter(
                (role) =>
                    this.statsByRole[role as Role]!.matches > minTotalMatches
            )
            .sort(
                (a, b) =>
                    this.statsByRole[b as Role]!.matches -
                    this.statsByRole[a as Role]!.matches
            );
    }
}
