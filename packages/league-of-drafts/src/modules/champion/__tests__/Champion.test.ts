import Champion from "../Champion";
import { getChampionData } from "../../common/utils/championDataUtils";
import Role from "../Role";

test("Kai'Sa to be picked ADC", () => {
    const kaiSaChampionData = getChampionData("Kaisa");

    const champion = new Champion(kaiSaChampionData);

    expect(champion.getRoles()).toContain(Role.Bottom);
});
