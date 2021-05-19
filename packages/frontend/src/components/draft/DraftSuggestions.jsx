import Search from "../../common/Search";
import Table from "../common/Table";
import { useTable, useSortBy } from "react-table";
import { useMemo } from "react";
import { numberToTier } from "@league-of-drafts/league-of-drafts";
import { winrate, winrateClass } from "../../utils/winrateUtils";
import useDraftStore from "../../store/draftStore";

export default function DraftSuggestions() {
    const role = useDraftStore((store) => store.selectedRole);
    const addChampion = useDraftStore((store) => store.addChampion);
    const draft = useDraftStore((store) => store.getSelectedDraft());

    const columns = useMemo(
        () => [
            {
                Header: "Champion",
                accessor: (suggestion) => suggestion.id,
                Cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${row.original.id}.png`}
                            className="w-[32px] h-[32px] min-w-[32px] min-h-[32px] mr-2"
                            alt="Champion image"
                        />
                        {row.original.name}
                    </div>
                ),
            },
            {
                Header: "Team Tier",
                accessor: (suggestion) => suggestion.priority,
                Cell: ({ value }) => (
                    <p className="text-xl text-center">{numberToTier(value)}</p>
                ),
                id: "teamtier",
            },
            {
                Header: "Ugg Winrate",
                accessor: (suggestion) => {
                    const stats = suggestion.stats;
                    return stats.wins / stats.matches;
                },
                sortType: (rowA, rowB) =>
                    rowA.original.stats.wins / rowA.original.stats.matches -
                    rowB.original.stats.wins / rowB.original.stats.matches,
                Cell: ({ row }) => {
                    const { wins, matches } = row.original.stats;
                    return (
                        <p
                            className={`text-center ${winrateClass(
                                wins,
                                matches
                            )}`}
                        >
                            {winrate(wins, matches)}
                        </p>
                    );
                },
                id: "winrate",
            },
        ],
        []
    );

    const data = useMemo(() => draft.getSuggestions(role), [draft, role]);

    const table = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: "teamtier",
                        desc: true,
                    },
                ],
            },
            autoResetSortBy: false,
        },
        useSortBy
    );

    const onClickRow = (row) => {
        addChampion(row.original.id, role);
    };

    const onSearch = (query) => {
        const row = table.rows.find((r) =>
            r.original.name.toLowerCase().includes(query.toLowerCase())
        );
        if (row) {
            const element = document.getElementById(`table-row-${row.id}`);
            element.scrollIntoView({ behavior: "smooth", block: "center" });

            element.classList.add("bg-dark-24");
            setTimeout(() => {
                element.classList.remove("bg-dark-24");
            },2000)
        }
    };

    return (
        <div className="p-4 px-8 h-full overflow-auto">
            <Search onSubmit={onSearch} />
            <Table className="mt-4 mx-4" table={table} onClick={onClickRow} />
        </div>
    );
}
