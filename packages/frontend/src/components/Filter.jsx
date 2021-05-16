import { XIcon } from "@heroicons/react/solid";

export default function Filter({ active, options, onClick = () => {} }) {
    return (
        <div className="bg-dark-2 rounded shadow flex justify-center overflow-hidden">
            {options.map((o, i) => {
                const Icon = o.icon;
                const isActive = active === o.value;
                return (
                    <button
                        className={`hover:bg-dark-6 p-1 focus:outline-none ${
                            isActive && "bg-dark-24"
                        }`}
                        onClick={() => onClick(o.value)}
                        key={i}
                    >
                        {Icon ? (
                            <Icon className="w-7" />
                        ) : (
                            <div className="mx-1">{o.value}</div>
                        )}
                    </button>
                );
            })}
            <button
                className="hover:bg-dark-6 p-1 focus:outline-none"
                style={{
                    color: "#656565",
                }}
                onClick={() => onClick(null)}
            >
                <XIcon className="w-7" />
            </button>
        </div>
    );
}
