import Draft from "../../draft/models/Draft";

test("Draftlines have all champions", () => {
    const draft = new Draft();
    draft.setChampions(["Pantheon", "Kha'Zix", "Zoe", "Ashe", "Bard"]);
    const draftLines = draft.getCompLines();

    expect(
        draftLines.frontLine.length +
            draftLines.midLine.length +
            draftLines.backLine.length
    ).toBe(5);
});
