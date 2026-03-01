import { StripeBeamCanvas } from "../components/Beam.tsx";
import { GlassDiv } from "../components/GlassDiv.tsx";

export default function LoginPage() {
    return (
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-indigo-500 font-sf">
            <StripeBeamCanvas fadeLeft={0} className="absolute top-0 right-0 w-full h-full" />
            <GlassDiv className="md:w-1/3 w-[95%] py-10">
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <h1 className="text-4xl font-bold text-white">Acesse sua conta</h1>
                    <input type="text" placeholder="Usuario" className="md:w-1/2 w-2/3 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    <input type="password" placeholder="Senha" className="md:w-1/2 w-2/3 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    <button type="submit" className="md:w-1/2 w-2/3 cursor-pointer px-4 py-3 my-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition duration-200 shadow-lg">Iniciar Sessão</button>
                </div>
            </GlassDiv>
        </section>
    )
}   