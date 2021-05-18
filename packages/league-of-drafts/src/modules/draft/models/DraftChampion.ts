import Role from "../../champion/Role";
import IChampionData from "../../champion/IChampionData";
import Champion from "../../champion/Champion";

export default class DraftChampion extends Champion {
    constructor(public role: Role, championData: IChampionData) {
        super(championData);
    }

    public toString() {
        return this.name;
    }

    clone() {
        return new DraftChampion(this.role, this);
    }
}
