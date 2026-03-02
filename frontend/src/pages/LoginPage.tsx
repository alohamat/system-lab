import { StripeBeamCanvas } from "../components/Beam.tsx";
import { GlassDiv } from "../components/layout/GlassDiv.tsx";
import { useState } from "react";
import GlassInput from "../components/layout/GlassInput.tsx";
import Switch from "../components/layout/Switch.tsx";



export default function LoginPage() {

    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-indigo-500 font-sf">
            <StripeBeamCanvas fadeLeft={0} className="absolute top-0 right-0 w-full h-full" />
            <GlassDiv className="md:w-1/3 w-[95%] py-10">
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <h1 className="text-4xl font-bold text-white">Acesse sua conta</h1>
                    <GlassInput type="password" placeholder="Usuário"/>
                    <GlassInput type="password" placeholder="Senha"/>
                    <button type="submit" className="md:w-1/2 w-2/3 cursor-pointer px-4 py-3 my-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition duration-200 shadow-lg">Iniciar Sessão</button>
                    <Switch />
                </div>
                {isRegistering ?? (
                    <div>

                    </div>
                )}
            </GlassDiv>
        </section>
    )
}   