import FlexibleContainer from "@/components/ui/flexible-container";
import { ModeToggle } from "@/components//mode-toggle";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "./auth-provider";

export default function LandingMenu() {
    const authContext = useContext(AuthContext)

    return (
        <FlexibleContainer is_fixed={true}>
            <Navigation />
            <div className="flex gap-3">
                <Button variant="outline" onClick={() => authContext.authModal.toogleActive()}>
                    Dashboard
                </Button>
                <ModeToggle />
            </div>
        </FlexibleContainer>
    )
}

const navItems = [
    {
        name: "Documentation",
        link: ""
    },
    {
        name: "GitHub",
        link: "https://github.com/leofaraf/awesome-todo"
    }
]

function Navigation() {
    return (
        <>
            <div className="sm:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {navItems.map(item => (
                            <DropdownMenuItem asChild>
                                <a href={item.link}>{item.name}</a>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="hidden sm:flex gap-3">
                {navItems.map(item => (
                    <Button asChild variant={"ghost"}>
                        <a href={item.link}>{item.name}</a>
                    </Button>
                ))}
            </div>
        </>
    )
}