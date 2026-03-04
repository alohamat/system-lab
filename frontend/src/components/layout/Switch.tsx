import { useState } from "react";

type SwitchProps = {
    click: () => void;
}

export default function Switch({ click }: SwitchProps) {
    const [enabled, setEnabled] = useState(false);

    return (
        <button
            onClick={() => {
                click();
                setEnabled(!enabled);
                console.log("clicked")
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${enabled ? "bg-green-500" : "bg-gray-300"
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${enabled ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </button>
    );
}