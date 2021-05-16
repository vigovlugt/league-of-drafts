import Draft from "../Draft";
import CompType from "../models/CompType";

export default class CompTypeAnalyzer {
    constructor(private draft: Draft) {}

    public getStrengths() {
        const strengthByCompType: { [key in CompType]: number } = {
            Attack: 0,
            Siege: 0,
            Split: 0,
            Protect: 0,
            Catch: 0,
        };

        for (const champion of this.draft.champions) {
            for (const compType of Object.keys(champion.strengthByComp)) {
                strengthByCompType[compType as CompType] +=
                    champion.strengthByComp[compType as CompType];
            }
        }

        for (const compType of Object.keys(strengthByCompType)) {
            strengthByCompType[compType as CompType] /=
                this.draft.champions.length;
        }

        return strengthByCompType;
    }

    public getCompType() {
        const strengths = this.getStrengths();

        return Object.keys(strengths).reduce((a, b) =>
            strengths[a as CompType] > strengths[b as CompType] ? a : b
        );
    }
}
