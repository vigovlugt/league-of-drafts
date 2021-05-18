import DraftSidebar from "../components/draft/DraftSidebar";
import DraftSuggestions from "../components/draft/DraftSuggestions";
import useDraftStore from "../store/draftStore";
import { Team } from "@league-of-drafts/league-of-drafts/";

export default function DraftPage() {
    const allyDraft = useDraftStore((store) => store.allyDraft);
    const enemyDraft = useDraftStore((store) => store.enemyDraft);

    return (
        <div
            className="flex-grow grid"
            style={{
                gridTemplateColumns: "1fr 3fr 1fr",
                gridTemplateRows: "100%",
                height: "calc(100vh - 74px)",
            }}
        >
            <DraftSidebar draft={allyDraft} team={Team.Ally} />
            <DraftSuggestions />
            <DraftSidebar draft={enemyDraft} team={Team.Enemy} />
        </div>
    );
}
