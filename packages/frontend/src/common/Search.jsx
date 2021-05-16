import { SearchIcon } from "@heroicons/react/outline";

export default function Search({ onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="relative w-full max-w-xl mx-auto">
            <input
                className="border rounded-md px-4 py-2 text-sm shadow border-dark-6 placeholder-gray-300 text-white bg-dark-3 w-full"
                placeholder="Search champions"
            />
            <SearchIcon className="w-5 text-gray-300 absolute right-3 top-1/2 bottom-0 transform -translate-y-1/2" />
        </form>
    );
}
