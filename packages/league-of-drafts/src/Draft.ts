import CompType from "./models/CompType";
import ChampionDataLoader from "./loaders/ChampionDataLoader";
import IChampionData from "./models/champion/IChampionData";
import DraftChampion from "./models/DraftChampion";
import Role from "./models/Role";

export default class Draft {
    private champions: DraftChampion[] = [];

    private readonly championData: IChampionData[];

    constructor(champions: string[] | null) {
        this.championData = ChampionDataLoader.getChampionData();

        if (champions) {
            this.setChampions(champions);
        }
    }

    public addChampion(championId: string, role: Role) {
        if (this.champions.length >= 5) {
            throw new Error("Max team limit 5");
        }

        // Check if id is valid.
        this.getChampionData(championId);

        const champion = new DraftChampion(championId, role);

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
        const strengthByCompType: { [key in CompType]: number } = {
            Attack: 0,
            Siege: 0,
            Split: 0,
            Protect: 0,
            Catch: 0,
        };

        for (const champion of this.champions) {
            const championData = this.getChampionData(champion.id);
            for (const compType of Object.keys(championData.strengthByComp)) {
                strengthByCompType[compType as CompType] +=
                    championData.strengthByComp[compType as CompType];
            }
        }

        for (const compType of Object.keys(strengthByCompType)) {
            strengthByCompType[compType as CompType] /= this.champions.length;
        }

        return strengthByCompType;
    }

    public getCompType() {
        const strengths = this.getStrengths();

        return Object.keys(strengths).reduce((a, b) =>
            strengths[a as CompType] > strengths[b as CompType] ? a : b
        );
    }

    private getChampionData(championId: string) {
        let championData = this.championData.find((c) => c.id === championId);

        if (!championData) {
            championData = this.championData.find((c) => c.name === championId);
        }

        if (!championData) {
            throw new Error("Champion unknown: " + championId);
        }

        return championData;
    }
}
