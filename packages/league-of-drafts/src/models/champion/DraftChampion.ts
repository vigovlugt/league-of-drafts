import Role from "../Role";
import IChampionData from "./IChampionData";
import Champion from "./Champion";

export default class DraftChampion extends Champion {
    constructor(public role: Role, championData: IChampionData) {
        super(championData);
    }

    public toString() {
        return this.name;
    }
}
