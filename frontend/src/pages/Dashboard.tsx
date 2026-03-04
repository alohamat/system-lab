import { StripeBeamCanvas } from "../components/Beam";
import { GlassDiv } from "../components/layout/GlassDiv.tsx";

export default function Dashboard() {
    return (
        <section className="relative overflow-hidden h-screen flex items-center bg-red-500 justify-center font-sf">
            <StripeBeamCanvas fadeLeft={0} className="absolute top-0 flex right-0 w-full h-full" />
            <GlassDiv className="w-[90%] h-[90%] py-10">
                 <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <h1 className="text-4xl font-bold text-white">Dashboard</h1>
                </div>
            </GlassDiv>
        </section>
    );
}