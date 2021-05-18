import { getRoleIconByRole } from "../../utils/roleUtils";
import { Team } from "@league-of-drafts/league-of-drafts";

const EMPTY_PNG =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export default function DraftChampion({
    role,
    active,
    setActive,
    champion,
    team,
}) {
    const Icon = getRoleIconByRole(role);

    const hasChampion = champion != null;
    const isEnemy = team === Team.Enemy;

    return (
        <div
            className={`h-full flex-1 border-b-2 border-dark-4 flex items-center p-4 cursor-pointer ${
                active && "bg-dark-4"
            } ${isEnemy ? "border-l-2 " : "border-r-2"}`}
            onClick={setActive}
        >
            <div className="flex flex-col justify-start">
                <Icon
                    className={`w-8 ${isEnemy ? "text-enemy" : "text-ally"}`}
                />

                <h3 className="font-header text-xl ml-1">
                    {hasChampion ? champion.name : role}
                </h3>
                <div
                    className={`rounded-full overflow-hidden flex justify-center items-center border-4 border-transparent w-[68px] h-[68px] min-w-[68px] min-h-[68px] ${
                        active
                            ? hasChampion &&
                              (isEnemy ? "border-enemy" : "border-ally")
                            : ""
                    }`}
                >
                    <img
                        src={
                            hasChampion
                                ? `https://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${champion.id}.png`
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
        </div>
    );
}
