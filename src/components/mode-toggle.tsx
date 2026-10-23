import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "../context-providers/theme-provider";

export default function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						aria-label="Open story menu"
						className={"relative *:h-[1.2rem] *:w-[1.2rem]"}
						size="icon"
						variant="outline"
					>
						<Sun className="dark-rotate-90 scale-100 rotate-0 transition-all dark:scale-0" />
						<Moon className="dark:scale-100` absolute scale-0 rotate-90 transition-all dark:rotate-0" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				}
			/>

			<DropdownMenuContent align="end">
				<DropdownMenuLabel className={'text-foreground'}>{theme}</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => setTheme("light")}>
						Light
					</DropdownMenuItem>

					<DropdownMenuItem onClick={() => setTheme("dark")}>
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						System
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
