import { useMemo, useState, useEffect } from "react";
import championData from "@league-of-drafts/data/dataset/dataset.json";
import ChampionCard from "../components/champions/ChampionCard";
import {
    Champion,
    Role,
    CompType,
    TIERS,
    tierToNumber,
} from "@league-of-drafts/league-of-drafts";
import Filter from "../components/Filter";
import { getRoleIconByRole } from "../utils/roleUtils";

export default function ChampionsPage() {
    const champions = useMemo(
        () => championData.map((c) => new Champion(c)),
        []
    );

    const [currentRole, setCurrentRole] = useState();
    const [currentCompType, setCurrentCompType] = useState();

    const [championsByTier, setChampionsByTier] = useState(
        TIERS.reduce((ac, a) => ({ ...ac, [a]: [] }), {})
    );

    useEffect(() => {
        const championsByTier = {};
        for (const tier of TIERS) {
            championsByTier[tier] = [];
            for (const champion of champions) {
                if (tier === "S") {
                    if (
                        champion.strengthByComp[currentCompType] >=
                        tierToNumber("S-")
                    ) {
                        championsByTier[tier].push(champion);
                    }
                } else if (tier === "F") {
                    if (
                        champion.strengthByComp[currentCompType] <=
                        tierToNumber("F+")
                    ) {
                        championsByTier[tier].push(champion);
                    }
                } else {
                    if (
                        champion.strengthByComp[currentCompType] <=
                            tierToNumber(tier + "+") &&
                        champion.strengthByComp[currentCompType] >=
                            tierToNumber(tier + "-")
                    ) {
                        championsByTier[tier].push(champion);
                    }
                }
            }

            championsByTier[tier].sort(
                (a, b) =>
                    b.strengthByComp[currentCompType] -
                    a.strengthByComp[currentCompType]
            );
        }

        setChampionsByTier(championsByTier);
    }, [currentCompType]);

    return (
        <div className="p-4 mx-auto max-w-7xl">
            <h1 className="px-2 text-4xl font-header text-light">Champions</h1>
            <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                    <p className="p-2 text-xl font-header text-light">Role</p>
                    <Filter
                        options={Object.keys(Role).map((r) => ({
                            value: r,
                            icon: getRoleIconByRole(r),
                        }))}
                        active={currentRole}
                        onClick={(value) => setCurrentRole(value)}
                    />
                </div>

                <div className="flex items-center">
                    <p className="ml-16 p-2 text-xl font-header text-light">
                        Team Comp Type
                    </p>
                    <Filter
                        options={Object.keys(CompType).map((r) => ({
                            value: r,
                        }))}
                        active={currentCompType}
                        onClick={(value) => setCurrentCompType(value)}
                    />
                </div>
            </div>

            {currentCompType ? (
                TIERS.filter((tier) => championsByTier[tier].length > 0).map(
                    (tier) => {
                        const tierChampions = championsByTier[tier].filter(
                            (c) =>
                                currentRole
                                    ? c.getRoles().includes(currentRole)
                                    : true
                        );

                        return (
                            tierChampions.length > 0 && (
                                <>
                                    <h3 className="px-2 text-4xl font-header text-light">
                                        {tier} - {tierChampions.length}
                                    </h3>

                                    <div className="flex flex-wrap">
                                        {tierChampions.map((c) => (
                                            <ChampionCard
                                                key={c.id}
                                                champion={c}
                                                tier={
                                                    c.strengthByComp[
                                                        currentCompType
                                                    ]
                                                }
                                            />
                                        ))}
                                    </div>
                                </>
                            )
                        );
                    }
                )
            ) : (
                <div className="flex flex-wrap">
                    {champions
                        .filter((c) =>
                            currentRole
                                ? c.getRoles().includes(currentRole)
                                : true
                        )
                        .map((c) => (
                            <ChampionCard key={c.id} champion={c} />
                        ))}
                </div>
            )}
        </div>
    );
}
