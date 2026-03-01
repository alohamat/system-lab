import { StripeBeamCanvas } from "../components/Beam.tsx";

export default function LoginPage() {
    return (
        <section className="relative overflow-hidden min-h-screen ">
            <StripeBeamCanvas className="absolute top-0 right-0 w-full md:w-3/5 h-full" />
        </section>
    )
}   