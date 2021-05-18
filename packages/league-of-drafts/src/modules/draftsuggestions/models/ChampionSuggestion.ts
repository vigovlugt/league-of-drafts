import Champion from "../../champion/Champion";
import IChampionData from "../../champion/IChampionData";

export default class ChampionSuggestion extends Champion {
    public priority: number;

    constructor(championData: IChampionData, priority: number) {
        super(championData);

        this.priority = priority;
    }
}
