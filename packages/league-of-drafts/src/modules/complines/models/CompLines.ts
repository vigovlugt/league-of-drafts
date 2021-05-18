import DraftChampion from "../../draft/models/DraftChampion";

export default class CompLines {
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
