import championData from "@league-of-drafts/data/dataset/dataset.json";
import Role from "../models/Role";

const totalMatches = championData
    .map((c) =>
        Object.keys(c.statsByRole).reduce(
            (n, role) => n + c.statsByRole[role as Role]!.matches,
            0
        )
    )
    .reduce((a, b) => a + b, 0);

export default totalMatches;
