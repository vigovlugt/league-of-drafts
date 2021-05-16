import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex-shrink-0 p-3 flex justify-between items-center font-header border-b-2 border-dark-4">
            <div className="w-1/2 flex justify-center tracking-wide text-light">
                <Link href="/draft" passHref>
                    <a className="hover:text-gray-300 hover:underline uppercase">
                        Draft
                    </a>
                </Link>
            </div>
            <Link href="/" passHref>
                <a>
                    <h2 className="font-bold text-5xl whitespace-nowrap text-white">
                        LEAGUE OF DRAFTS
                    </h2>
                </a>
            </Link>
            <div className="w-1/2 flex justify-center tracking-wide text-light">
                <Link href="/champions" passHref>
                    <a className="hover:text-gray-300 hover:underline uppercase">
                        Champions
                    </a>
                </Link>
            </div>
        </div>
    );
}
