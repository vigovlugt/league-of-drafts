import Champion from "../../champion/Champion";
import IChampionData from "../../champion/IChampionData";
import IStats from "../../common/models/IStats";
import Role from "../../champion/Role";

export default class ChampionSuggestion extends Champion {
    public priority: number;
    public stats: IStats;

    constructor(championData: IChampionData, role: Role, priority: number) {
        super(championData);

        this.stats = championData.statsByRole[role as Role] || {
            wins: 0,
            matches: 0,
        };

        this.priority = priority;
    }
}
