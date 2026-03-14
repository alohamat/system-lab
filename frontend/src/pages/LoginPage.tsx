import { StripeBeamCanvas } from "../components/Beam.tsx";
import { GlassDiv } from "../components/layout/GlassDiv.tsx";
import { useState } from "react";
import GlassInput from "../components/layout/GlassInput.tsx";
import axios from "axios";


export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                throw Error("Missing credentials")
            }
            const response = await axios.post("http://localhost:8080/login", {
                username,
                password,
            });
            console.log(response.data);
        } catch (error) {
            alert(error)
            console.error(error);
        }
    };

    const handleRegister = async () => {
        try {
             if (!username || !password) {
                throw Error("Missing credentials")
            }
            const response = await axios.post("http://localhost:8080/register", {
                username,
                password,
                email,
                confirmPassword,
            });
            console.log(response.data);
        } catch (error) {
            alert(error)
            console.error(error);
        }
    };

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-indigo-500 font-sf">
            <StripeBeamCanvas fadeLeft={0} className="absolute top-0 right-0 w-full h-full" />
            <GlassDiv className="md:w-1/3 w-[95%] py-10">
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <h1 className="text-4xl font-bold text-white">{isRegistering ? "Registre-se" : "Acesse sua conta"}</h1>
                    <GlassInput type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <GlassInput type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {isRegistering && (
                        <div className="flex flex-col w-full items-center space-y-4">
                            <GlassInput type="password" placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <GlassInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    )}
                    <button type="submit" onClick={isRegistering ? handleRegister : handleLogin} className="md:w-1/2 w-2/3 cursor-pointer px-4 py-3 my-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition duration-200 shadow-lg">Iniciar Sessão</button>
                    <div className="flex items-center justify-center space-x-2">
                        <p className="text-white">{isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}</p>
                        <strong className="text-orange-600 underline cursor-pointer" onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "Login" : "Registre-se"}</strong>
                    </div>
                </div>
            </GlassDiv>
        </section>
    )
}