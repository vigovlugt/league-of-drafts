const {
    Draft,
    CompType,
    championData,
    Role,
    Champion,
} = require("../../dist/index");

test("Kai'Sa to be picked ADC", () => {
    const kaiSaChampionData = championData.find((c) => c.id === "Kaisa");

    const champion = new Champion(kaiSaChampionData);

    expect(champion.getRoles(totalMatches)).toContain(Role.Bottom);
});
