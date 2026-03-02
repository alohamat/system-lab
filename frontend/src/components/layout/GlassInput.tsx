type GlassInputProps = {
    type: string;
    placeholder: string;
}

export default function GlassInput({ type, placeholder }: GlassInputProps) {
    return (
        <input type={type} placeholder={placeholder} className="md:w-1/2 w-2/3 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
    )
}