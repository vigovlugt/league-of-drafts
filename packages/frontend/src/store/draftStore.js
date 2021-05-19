import create from "zustand";
import { Role, Draft, Team } from "@league-of-drafts/league-of-drafts";

const useDraftStore = create((set, get) => ({
    version: 0,
    allyDraft: new Draft(),
    enemyDraft: new Draft(),
    selectedRole: Role.Top,
    selectedTeam: Team.Ally,
    selected: {
        role: Role.Top,
        enemy: false,
    },
    getSelectedDraft: () => {
        const state = get();
        return state.selectedTeam === Team.Enemy
            ? state.enemyDraft
            : state.allyDraft;
    },
    setSelected: (role, team) =>
        set(() => ({ selectedRole: role, selectedTeam: team })),
    addChampion: (id, role) => {
        const selectedDraft = get().getSelectedDraft();
        selectedDraft.addChampionFromId(id, role);

        set(({ version }) => ({ version: version + 1 }));
    },
    removeChampion: (team, role) => {
        const state = get();
        const draft = team === Team.Enemy ? state.enemyDraft : state.allyDraft;

        draft.removeChampion(role);

        set(({ version }) => ({ version: version + 1 }));
    },
}));

export default useDraftStore;
