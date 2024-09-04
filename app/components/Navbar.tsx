import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
    RegisterLink,
    LoginLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";

export async function Navbar() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();
    return (
        <nav className="border-b bg-background h-[10vh] flex items-center">
            <div className="container flex items-center justify-between ">
                <Link href={"/"}>
                    <h1 className="font-bold text-3xl">
                        Notes<span className="text-primary">whiz</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-x-5">
                    <ThemeToggle></ThemeToggle>
                    {(await isAuthenticated()) ? (
                        // <LogoutLink>
                        //     <Button>Log out</Button>
                        // </LogoutLink>
                        <UserNav
                            email={user?.email as string}
                            image={user?.picture as string}
                            name={user?.given_name as string}
                        ></UserNav>
                    ) : (
                        <div className="flex items-center gap-x-5">
                            <RegisterLink>
                                <Button>Sign Up</Button>
                            </RegisterLink>
                            <LoginLink>
                                <Button variant="secondary">Log In</Button>
                            </LoginLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
