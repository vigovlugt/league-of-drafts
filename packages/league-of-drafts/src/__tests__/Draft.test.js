const { Draft, CompType } = require("../../dist/index");

test("Attack composition == Attack", () => {
    const draft = new Draft();
    draft.setChampions([
        "Malphite",
        "Amumu",
        "Orianna",
        "Miss Fortune",
        "Brand",
    ]);

    expect(draft.getCompType()).toBe(CompType.Attack);
});

test("Catch composition == Catch", () => {
    const draft = new Draft();
    draft.setChampions(["Pantheon", "Kha'Zix", "Zoe", "Ashe", "Bard"]);

    expect(draft.getCompType()).toBe(CompType.Catch);
});

test("Protect composition == Protect", () => {
    const draft = new Draft();
    draft.setChampions(["Kayle", "Nunu", "Lulu", "Kog'Maw", "Janna"]);

    expect(draft.getCompType()).toBe(CompType.Protect);
});

test("Siege composition == Siege", () => {
    const draft = new Draft();
    draft.setChampions(["Jayce", "Trundle", "Xerath", "Caitlyn", "Braum"]);

    expect(draft.getCompType()).toBe(CompType.Siege);
});

test("Split composition == Split", () => {
    const draft = new Draft();
    draft.setChampions([
        "Tryndamere",
        "Evelynn",
        "Ekko",
        "Sivir",
        "Tahm Kench",
    ]);

    expect(draft.getCompType()).toBe(CompType.Split);
});

test("Draftlines have all champions", () => {
    const draft = new Draft();
    draft.setChampions(["Pantheon", "Kha'Zix", "Zoe", "Ashe", "Bard"]);
    const draftLines = draft.getDraftLines();

    expect(
        draftLines.frontLine.length +
            draftLines.midLine.length +
            draftLines.backLine.length
    ).toBe(5);
});
