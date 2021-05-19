import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import useDraftStore from "../../store/draftStore";

export default function DraftChampionMenu({ role, team }) {
    const removeChampion = useDraftStore((store) => store.removeChampion);

    return (
        <Menu as="div" className="relative ">
            <Menu.Button
                className="p-2 -m-2 focus:outline-none"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <DotsHorizontalIcon className="w-6" />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="bg-dark-24 shadow-lg rounded p-1 absolute right-0 w-24 text-center">
                    <Menu.Item
                        as="div"
                        className="px-2 py-1 hover:bg-dark-1 rounded"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeChampion(team, role)
                        }}
                    >
                        Remove
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
