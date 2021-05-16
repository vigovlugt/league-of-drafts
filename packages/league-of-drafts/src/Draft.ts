import IChampionData from "./models/champion/IChampionData";
import DraftChampion from "./models/champion/DraftChampion";
import Role from "./models/Role";
import DraftLineAnalyzer from "./analyzers/DraftLineAnalyzer";

import championData from "@league-of-drafts/data/dataset/dataset.json";
import CompTypeAnalyzer from "./analyzers/CompTypeAnalyzer";

export default class Draft {
    public champions: DraftChampion[] = [];
    private readonly draftLineAnalyzer: DraftLineAnalyzer;
    private readonly compTypeAnalyzer: CompTypeAnalyzer;

    constructor(champions: string[] | null) {
        this.draftLineAnalyzer = new DraftLineAnalyzer(this);
        this.compTypeAnalyzer = new CompTypeAnalyzer(this);

        if (champions) {
            this.setChampions(champions);
        }
    }

    public addChampion(championId: string, role: Role) {
        if (this.champions.length >= 5) {
            throw new Error("Max team limit 5");
        }

        const championInfo = this.getChampionData(championId);

        const champion = new DraftChampion(role, championInfo);

        this.champions.push(champion);
    }

    public setChampions(championIds: string[]) {
        if (championIds.length != 5) {
            throw new Error("Must set 5 champions not: " + championIds.length);
        }

        this.champions = [];

        this.addChampion(championIds[0], Role.Top);
        this.addChampion(championIds[1], Role.Jungle);
        this.addChampion(championIds[2], Role.Mid);
        this.addChampion(championIds[3], Role.Bottom);
        this.addChampion(championIds[4], Role.Support);
    }

    public getStrengths() {
        return this.compTypeAnalyzer.getStrengths();
    }

    public getCompType() {
        return this.compTypeAnalyzer.getCompType();
    }

    public getDraftLines() {
        return this.draftLineAnalyzer.getDraftLines();
    }

    private getChampionData(championId: string): IChampionData {
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
}
