import Draft from "../../draft/models/Draft";
import { BACKLINE, FRONTLINE, MIDLINE } from "../constants/LinesByClass";
import CompLines from "../models/CompLines";

export default class CompLineAnalyzer {
    static getDraftLines(draft: Draft) {
        const frontLine = draft.champions.filter((c) =>
            FRONTLINE.includes(c.class)
        );

        const midLine = draft.champions.filter((c) =>
            MIDLINE.includes(c.class)
        );

        const backLine = draft.champions.filter((c) =>
            BACKLINE.includes(c.class)
        );

        return new CompLines(frontLine, midLine, backLine);
    }
}
