import DraftChampion from "./champion/DraftChampion";

export default class DraftLines {
    constructor(
        public frontLine: DraftChampion[],
        public midLine: DraftChampion[],
        public backLine: DraftChampion[]
    ) {}

    public toString() {
        return (
            "FRONTLINE: " +
            this.frontLine.join(" ") +
            "\n" +
            "MIDLINE: " +
            this.midLine.join(" ") +
            "\n" +
            "BACKLINE: " +
            this.backLine.join(" ")
        );
    }
}
