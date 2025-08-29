import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import type { LoginFormProps } from "@/types";
import { useState } from "react";

export default function LoginForm({setIsLoggedIn}: LoginFormProps) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Logged in user:", user);
            setIsLoggedIn(true);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Erro ao fazer login: " + errorCode + errorMessage);
        });
    }

    return (
    <form onSubmit={handleLogin}>
        <Input className="mb-4" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input className="mb-4" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button type="submit">Entrar</Button>
    </form>
    );
}
