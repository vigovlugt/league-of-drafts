const { Draft } = require("./dist/index");

// (() => {
//     const draft = new Draft();
//     draft.addChampions(["Udyr", "Viktor", "Sett", "Kog'Maw", "Lulu"]);
//     console.log(draft.getStrengths());
// })();
// (() => {
//     const draft = new Draft();
//     draft.addChampions(["Kai'Sa", "Lee Sin", "Morgana", "Leona", "Akali"]);
//     console.log(draft.getStrengths());
// })();

(() => {
    const draft = new Draft();
    draft.setChampions(["Gnar", "Olaf", "Twisted Fate", "Aphelios", "Thresh"]);
    console.log(draft.getStrengths());
})();