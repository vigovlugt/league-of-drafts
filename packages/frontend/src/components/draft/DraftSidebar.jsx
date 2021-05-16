import { useState } from "react";
import { Role } from "@league-of-drafts/league-of-drafts";
import { getRoleIconByRole } from "../../utils/roleUtils";

export default function DraftSidebar({ draft }) {
    const [selectedRole, setSelectedRole] = useState(Role.Top);

    return (
        <div className="flex flex-col h-full">
            {Object.keys(Role).map((role) => (
                <DraftRole
                    key={role}
                    role={role}
                    active={selectedRole === role}
                    setActive={() => setSelectedRole(role)}
                    champion={draft && draft.getChampion(role)}
                />
            ))}
        </div>
    );
}

const EMPTY_PNG =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

function DraftRole({ role, active, setActive, champion }) {
    const Icon = getRoleIconByRole(role);

    const hasChampion = champion != null;

    return (
        <div
            className={`h-full flex-1 border-b-2 border-r-2 border-dark-4 cursor-pointer relative flex items-center p-4 ${
                active && "bg-dark-4"
            }`}
            onClick={setActive}
        >
            <Icon className="w-8 absolute top-2 left-4" />
            {
                <div>
                    <h3 className="font-header text-xl ml-1">
                        {hasChampion ? champion.name : role}
                    </h3>
                    <div
                        className={`relative rounded-full overflow-hidden border-4 border-transparent ${
                            active && hasChampion && "border-primary"
                        }`}
                    >
                        <img
                            src={
                                hasChampion
                                    ? `http://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${champion.id}.png`
                                    : EMPTY_PNG
                            }
                            className="w-[64px] h-[64px] min-w-[64px] min-h-[64px]"
                            alt={role}
                            style={{
                                transform: "scale3d(1.1,1.1,1.1)",
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    );
}
