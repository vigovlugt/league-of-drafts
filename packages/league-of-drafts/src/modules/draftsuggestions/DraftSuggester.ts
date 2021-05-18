import Draft from "../draft/models/Draft";
import Role from "../champion/Role";
import { championsByRole } from "../common/utils/championDataUtils";
import ChampionSuggestion from "./models/ChampionSuggestion";
import IChampionData from "../champion/IChampionData";
import DraftChampion from "../draft/models/DraftChampion";

export default class DraftSuggester {
    public static getSuggestions(draft: Draft, role: Role) {
        const champions = championsByRole[role];

        const suggestions = champions
            .filter(
                (champ) =>
                    !draft.champions.find(
                        (c) => c.id === champ.id && c.role !== role
                    )
            )
            .map(
                (c) =>
                    new ChampionSuggestion(
                        c,
                        this.getPriorityForChampion(draft, role, c)
                    )
            );

        return suggestions.sort((a, b) => b.priority - a.priority);
    }

    private static getPriorityForChampion(
        draft: Draft,
        role: Role,
        champion: IChampionData
    ) {
        const clone = draft.clone();
        clone.removeChampion(role);

        clone.addChampion(new DraftChampion(role, champion));

        return clone.getCompTypeStrength();
    }
}
