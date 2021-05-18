import Draft from "../draft/models/Draft";
import CompType from "./CompType";

export default class CompTypeAnalyzer {
    public static getStrengths(draft: Draft) {
        const strengthByCompType: { [key in CompType]: number } = {
            Attack: 0,
            Siege: 0,
            Split: 0,
            Protect: 0,
            Catch: 0,
        };

        for (const champion of draft.champions) {
            for (const compType of Object.keys(champion.strengthByComp)) {
                strengthByCompType[compType as CompType] +=
                    champion.strengthByComp[compType as CompType];
            }
        }

        for (const compType of Object.keys(strengthByCompType)) {
            strengthByCompType[compType as CompType] /= draft.champions.length;
        }

        return strengthByCompType;
    }

    public static getCompType(draft: Draft) {
        const strengths = this.getStrengths(draft);

        return Object.keys(strengths).reduce((a, b) =>
            strengths[a as CompType] > strengths[b as CompType] ? a : b
        );
    }

    public static getCompTypeStrength(draft: Draft) {
        const strengths = this.getStrengths(draft);

        return Object.values(strengths).reduce((a, b) => (a > b ? a : b));
    }
}
