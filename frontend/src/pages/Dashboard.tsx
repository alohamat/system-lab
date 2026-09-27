import { GlassDiv } from "../components/GlassDiv"

export default function DashboardPage() {
    return (
        <div className="bg-linear-to-br from-sky-600 to-orange-300 via-pink-500 h-screen flex justify-center items-center">
            <GlassDiv className="w-[30vw] h-[30vh] flex">
                <div className="flex flex-col gap-2 justify-center w-full items-center">
                    <input type="text" className="bg-white/50 w-[90%] h-[15%] rounded-lg p-2 outline-none transition-all duration-300 focus:scale-105 focus:shadow-2xl" placeholder="Usuário" />
                    <input type="password" className="bg-white/50 w-[90%] h-[15%] rounded-lg p-2 outline-none transition-all duration-300 focus:scale-105 focus:shadow-2xl" placeholder="Senha" />
                    <button className="bg-sky-600 w-[90%] h-[15%] rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">Login</button>
                </div>
            </GlassDiv>
        </div>
    )
}