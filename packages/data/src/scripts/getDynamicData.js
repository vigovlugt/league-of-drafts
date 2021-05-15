import {getAllUggChampionData, getUggVersion, saveAllUggChampionInfo} from "../lib/ugg.js";
import {getChampions, getVersion, saveChampions} from "../lib/ddragon.js";

async function main() {
  // DDRAGON DATA

  const version = await getVersion();
  console.log("Gotten version:", version);

  const champions = await getChampions(version);
  await saveChampions(champions);
  console.log("Gotten champions");

  // UGG DATA

  const uggVersion = await getUggVersion();
  console.log("Gotten UGG version:", version);

  const uggRoleChampionData = await getAllUggChampionData(uggVersion, champions);
  await saveAllUggChampionInfo(uggRoleChampionData);
  console.log("Gotten UGG Champion data");
}

main();