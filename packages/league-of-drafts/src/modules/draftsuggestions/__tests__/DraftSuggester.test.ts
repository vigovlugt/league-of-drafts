import Draft from "../../draft/models/Draft";
import DraftSuggester from "../DraftSuggester";
import Role from "../../champion/Role";

test("Suggest tryndamere for split comp", () => {
    const draft = new Draft();
    draft.setChampions([null, "Evelynn", "Ekko", "Sivir", "Tahm Kench"]);
    const suggestedChampions = DraftSuggester.getSuggestions(draft, Role.Top);

    expect(suggestedChampions.slice(0, 3).map((s) => s.id)).toContain(
        "Tryndamere"
    );
});
