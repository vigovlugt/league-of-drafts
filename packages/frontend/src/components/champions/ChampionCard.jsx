import { getRoleIconByRole } from "../../utils/roleUtils";
import { numberToTier } from "@league-of-drafts/league-of-drafts";

export default function ChampionCard({ champion, tier = null }) {
    const imageId =
        champion.id === "Fiddlesticks" ? "FiddleSticks" : champion.id;

    return (
        <div className="m-2">
            <div className="relative">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${imageId}_0.jpg`}
                    className="w-32 w-32 min-w-[128px] min-h-[128px] relative"
                    alt={champion.name}
                />
                <div className="absolute right-0 bottom-0 flex justify-end bg-black bg-opacity-30">
                    {champion.getRoles().map((role) => {
                        const Icon = getRoleIconByRole(role);

                        return <Icon key={role} className="w-8 text-white" />;
                    })}
                </div>
                {tier !== null && (
                    <span className="absolute right-0 top-0 flex justify-end bg-black bg-opacity-30 text-xl p-1 font-header">
                        {numberToTier(tier)}
                    </span>
                )}
            </div>
            <h3 className="text-center font-header text-xl">{champion.name}</h3>
        </div>
    );
}
