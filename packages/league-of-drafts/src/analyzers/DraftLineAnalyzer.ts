import Draft from "../Draft";
import { BACKLINE, FRONTLINE, MIDLINE } from "../config/ClassLines";
import DraftLines from "../models/DraftLines";

export default class DraftLineAnalyzer {
    constructor(private draft: Draft) {}

    getDraftLines() {
        const frontLine = this.draft.champions.filter((c) =>
            FRONTLINE.includes(c.class)
        );

        const midLine = this.draft.champions.filter((c) =>
            MIDLINE.includes(c.class)
        );

        const backLine = this.draft.champions.filter((c) =>
            BACKLINE.includes(c.class)
        );

        return new DraftLines(frontLine, midLine, backLine);
    }
}
