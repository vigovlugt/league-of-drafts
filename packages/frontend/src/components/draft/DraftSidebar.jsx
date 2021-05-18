import { Role, numberToTier } from "@league-of-drafts/league-of-drafts";
import { useMemo } from "react";
import DraftChampion from "./DraftChampion";
import useDraftStore from "../../store/draftStore";
import { Team } from "@league-of-drafts/league-of-drafts";

export default function DraftSidebar({ draft, team }) {
    const selectedRole = useDraftStore((store) => store.selectedRole);
    const selectedTeam = useDraftStore((store) => store.selectedTeam);
    const setSelected = useDraftStore((store) => store.setSelected);
    const version = useDraftStore((store) => store.version);

    const compTypeTier = useMemo(() => draft.getCompTypeStrength(), [version]);

    const compType = useMemo(() => draft.getCompType(), [version]);

    const championByRole = useMemo(
        () =>
            Object.keys(Role).reduce(
                (acc, role) => ({
                    ...acc,
                    [role]: draft.getChampion(role),
                }),
                {}
            ),
        [version]
    );

    const setSelectedRole = (role) => setSelected(role, team);

    return (
        <div className="flex flex-col h-full">
            <div
                className={`h-[100px] flex-1 flex-grow-0 border-b-2 border-dark-4 cursor-pointer relative flex items-center p-4 flex items-center justify-center ${
                    team === Team.Enemy ? "border-l-2 " : "border-r-2"
                }`}
            >
                <h2 className="text-xl font-header uppercase tracking-wide">
                    {compType} - <span>{numberToTier(compTypeTier)}</span>
                </h2>
            </div>
            {Object.keys(Role).map((role) => (
                <DraftChampion
                    key={role}
                    role={role}
                    active={selectedRole === role && selectedTeam === team}
                    setActive={() => setSelectedRole(role)}
                    champion={championByRole[role]}
                    team={team}
                />
            ))}
        </div>
    );
}
