import CompType from "../CompType";
import Draft from "../../draft/models/Draft";
import CompTypeAnalyzer from "../CompTypeAnalyzer";

test("Attack composition == Attack", () => {
    const draft = new Draft();
    draft.setChampions([
        "Malphite",
        "Amumu",
        "Orianna",
        "Miss Fortune",
        "Brand",
    ]);

    expect(CompTypeAnalyzer.getCompType(draft)).toBe(CompType.Attack);
});

test("Catch composition == Catch", () => {
    const draft = new Draft();
    draft.setChampions(["Pantheon", "Kha'Zix", "Zoe", "Ashe", "Bard"]);

    expect(CompTypeAnalyzer.getCompType(draft)).toBe(CompType.Catch);
});

test("Protect composition == Protect", () => {
    const draft = new Draft();
    draft.setChampions(["Kayle", "Nunu", "Lulu", "Kog'Maw", "Janna"]);

    expect(CompTypeAnalyzer.getCompType(draft)).toBe(CompType.Protect);
});

test("Siege composition == Siege", () => {
    const draft = new Draft();
    draft.setChampions(["Jayce", "Trundle", "Xerath", "Caitlyn", "Braum"]);

    expect(CompTypeAnalyzer.getCompType(draft)).toBe(CompType.Siege);
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

    expect(CompTypeAnalyzer.getCompType(draft)).toBe(CompType.Split);
});