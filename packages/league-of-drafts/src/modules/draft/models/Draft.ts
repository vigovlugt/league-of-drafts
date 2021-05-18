import DraftChampion from "./DraftChampion";
import Role, { ROLES } from "../../champion/Role";
import CompLineAnalyzer from "../../complines/analyzers/CompLineAnalyzer";

import CompTypeAnalyzer from "../../comptype/CompTypeAnalyzer";
import { getChampionData } from "../../common/utils/championDataUtils";
import DraftSuggester from "../../draftsuggestions/DraftSuggester";

export default class Draft {
    public champions: DraftChampion[] = [];

    constructor(champions?: string[] | DraftChampion[]) {
        if (champions && champions.length) {
            if (typeof champions[0] === "string") {
                this.setChampions(champions as string[]);
            } else {
                this.champions = champions as DraftChampion[];
            }
        }
    }

    public addChampion(draftChampion: DraftChampion) {
        this.removeChampion(draftChampion.role);

        this.champions.push(draftChampion);
    }

    public removeChampion(role: Role) {
        this.champions = this.champions.filter((c) => c.role !== role);
    }

    public addChampionFromId(championId: string, role: Role) {
        const championData = getChampionData(championId);

        const champion = new DraftChampion(role, championData);

        this.addChampion(champion);
    }

    public setChampions(championIds: (string | null)[]) {
        if (championIds.length != 5) {
            throw new Error("Must set 5 champions not: " + championIds.length);
        }

        this.champions = [];

        for (let i = 0; i < championIds.length; i++) {
            if (championIds[i] != null) {
                this.addChampionFromId(championIds[i] as string, ROLES[i]);
            }
        }
    }

    public getChampion(role: Role) {
        return this.champions.find((c) => c.role === role);
    }

    public getCompStrengths() {
        return CompTypeAnalyzer.getStrengths(this);
    }

    public getCompType() {
        return CompTypeAnalyzer.getCompType(this);
    }

    public getCompTypeStrength() {
        return CompTypeAnalyzer.getCompTypeStrength(this);
    }

    public getCompLines() {
        return CompLineAnalyzer.getDraftLines(this);
    }

    public getSuggestions(role: Role) {
        return DraftSuggester.getSuggestions(this, role);
    }

    public clone() {
        return new Draft(this.champions.map((c) => c.clone()));
    }

    public getId() {
        return ROLES.map((role) => this.getChampion(role)?.id || "").join("|");
    }
}
