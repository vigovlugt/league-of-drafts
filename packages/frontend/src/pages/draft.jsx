import DraftSidebar from "../components/draft/DraftSidebar";
import { Draft, Role } from "@league-of-drafts/league-of-drafts";
import { useEffect, useState } from "react";
import DraftChampions from "../components/draft/DraftChampions";

export default function DraftPage() {
    const [draft, setDraft] = useState();

    useEffect(() => {
        const newDraft = new Draft();
        newDraft.addChampion("Camille", Role.Top);
        setDraft(newDraft);
    }, []);

    return (
        <div
            className="h-full flex-grow grid"
            style={{
                gridTemplateColumns: "1fr 2fr 1fr",
                gridTemplateRows: "100%",
            }}
        >
            <DraftSidebar draft={draft} />
            <DraftChampions draft={draft} />
            <div className="p-4">
                <h2 className="text-2xl font-header text-center">
                    {draft && draft.getCompType()}
                </h2>
            </div>
        </div>
    );
}
