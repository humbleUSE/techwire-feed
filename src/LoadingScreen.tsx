import { CircleIcon } from "lucide-react";

export default function LoadingScreen() {
	return (
		<div className="loading-screen mx-auto grid h-dvh max-w-7xl place-content-center place-items-center gap-1.5">
			<div className="loader-icon relative grid size-6 place-items-center">
				<CircleIcon
					className="absolute z-0"
					stroke="var(--bg-muted)"
					strokeDasharray={"100 0"}
					strokeDashoffset={0}
					strokeWidth={1.5}
				/>
				<CircleIcon
					className="absolute z-1 animate-[spin_1.2s_infinite_linear]"
					stroke="var(--accent)"
					strokeDasharray={"60%  150%"}
					strokeDashoffset={0}
					strokeLinecap="butt"
					strokeWidth={1.4}
				/>
			</div>

			<p className="font-mono text-base tracking-wide">
				<span className="text-(--text-subtle)">Loading</span>
				<span className="text-(--text-muted) *:inline-block">
					<span className="animate-[pulse_1s_infinite_200ms_ease]">
						.
					</span>
					<span className="animate-[pulse_1s_infinite__400ms_ease]">
						.
					</span>
					<span className="animate-[pulse_1s_infinite_800ms_ease]">
						.
					</span>
				</span>
			</p>
		</div>
	);
}
