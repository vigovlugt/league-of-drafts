import { getRoleIconByRole } from "../../utils/roleUtils";
import { numberToTier } from "@league-of-drafts/league-of-drafts";
import { winrate, winrateClass } from "../../utils/winrateUtils";

export default function ChampionCard({ champion, tier = null, stats = null }) {
    const imageId =
        champion.id === "Fiddlesticks" ? "FiddleSticks" : champion.id;

    return (
        <div className="m-2">
            <div className="relative">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${imageId}_0.jpg`}
                    className="w-32 h-32 min-w-[128px] min-h-[128px] relative"
                    alt={champion.name}
                />

                <div className="absolute inset-0 bg-black bg-opacity-20" />

                <div className="absolute right-0 bottom-0 flex justify-end ">
                    {champion.getRoles().map((role) => {
                        const Icon = getRoleIconByRole(role);

                        return <Icon key={role} className="w-8 text-white" />;
                    })}
                </div>
                {tier !== null && (
                    <span className="absolute right-0 top-0 flex justify-end text-xl p-1 font-header">
                        {numberToTier(tier)}
                    </span>
                )}
                {stats !== null && (
                    <span
                        className={`absolute left-0 top-0 flex justify-end text-lg p-1 ${winrateClass(
                            stats.wins,
                            stats.matches
                        )}`}
                        style={{
                            textShadow: "black 0px 0px 5px",
                        }}
                    >
                        {winrate(stats.wins, stats.matches)}
                    </span>
                )}
            </div>
            <h3 className="text-center font-header text-xl">{champion.name}</h3>
        </div>
    );
}
