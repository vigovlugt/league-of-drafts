const { Draft, Role, DraftSuggester } = require("./dist/index");

(() => {
    const draft = new Draft();
    draft.setChampions([null, "Evelynn", "Ekko", "Sivir", "Tahm Kench"]);
    const suggestedChampions = draft.getSuggestions(Role.Top);

    console.log(
        suggestedChampions
            .map((c) => ({ name: c.name, priority: c.priority }))
            .slice(0, 10)
    );
})();
