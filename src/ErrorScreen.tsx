import { GlobeIcon } from "lucide-react";

export default function ErrorScreen() {
	return (
		<div className="error-page relative grid h-dvh place-items-center">
			<GlobeIcon className="size-full" opacity={0.05} strokeWidth={0.5} />
			<div className="absolute grid w-3/4 items-center justify-items-center gap-5">
				<span className="server-icon-group grid grid-cols-3 place-items-center gap-8">
					<svg
						aria-hidden="true"
						className="lucide lucide-server-cog"
						fill="none"
						height="60"
						stroke="var(--text-subtle)"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.2"
						viewBox="0 0 24 24"
						width="60"
						xmlns="http://www.w3.org/2000/svg"
					>
						<svg
							aria-hidden
							className="origin-center animate-[spin_5s_infinite_forwards_linear]"
							id="spinning-gear"
						>
							<g
								className="group-gear"
								stroke="var(--color-red-500)"
								strokeWidth={1.5}
							>
								<path d="m10.852 14.772-.383.923"></path>
								<path d="M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923"></path>
								<path d="m13.148 9.228.383-.923"></path>
								<path d="m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544"></path>
								<path d="m14.772 10.852.923-.383"></path>
								<path d="m14.772 13.148.923.383"></path>
								<path d="m9.228 10.852-.923-.383"></path>
								<path d="m9.228 13.148-.923.383"></path>
							</g>
						</svg>
						<path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"></path>
						<path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"></path>
						<path d="M6 18h.01"></path>
						<path d="M6 6h.01"></path>
					</svg>
					<svg
						aria-hidden="true"
						className="lucide lucide-arrow-right"
						fill="none"
						height="60"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1"
						viewBox="0 0 24 24"
						width="60"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							className="arrow"
							stroke="var(--text-subtle)"
							strokeLinejoin="round"
							strokeWidth={1}
						>
							<path
								className="animate-[draw_2s_linear_normal_infinite_1s,reveal_2s_ease]"
								d="M5 12h16"
								id="arrow-length"
								strokeDasharray={"2 1.5"}
								strokeDashoffset={-14}
							></path>
							<path
								className="animate-[draw_1.5s_linear_forwards_1]"
								d="m21 12 -4 -3"
								id="arrow-shaft"
								strokeDasharray={"10"}
								strokeDashoffset={10}
							></path>
							<path
								className="animate-[draw_1.5s_linear_forwards_1]"
								d="m21 12  -4 3"
								id="arrow-shaft"
								strokeDasharray={"10"}
								strokeDashoffset={10}
							></path>
						</g>
					</svg>
					<svg
						aria-hidden="true"
						className="lucide lucide-server-crash;"
						fill="none"
						height="60"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="miter"
						strokeWidth="1.2"
						viewBox="0 0 24 24"
						width="60"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							className="animate-[draw_1.5s_forwards_ease-in_2_1s] text-(--accent)"
							d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"
							id="server-top"
						></path>
						<path
							className="animate-[draw_1s_forwards_ease-in_1s] text-(--accent)/50"
							d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"
							id="server-bottom"
							strokeDashoffset={"100%"}
						></path>
						<path
							className="animate-[reveal_2s_ease_2s,pulse_1.5s_infinite_ease_3s] opacity-0"
							d="M6 6h.01"
						></path>
						<path
							className="animate-[reveal_2s_ease_2.5s,pulse_1.5s_infinite_ease_3s] opacity-0"
							d="M6 18h.01"
						></path>
						<svg
							aria-hidden
							className="origin-center animate-[spin_2s_infinite_forwards_linear]"
							id="spinning-gear"
						>
							<g
								className="group-gear animate-[reveal_1.5s_ease-in_2s_1_forwards] stroke-[1.5] opacity-0 starting:opacity-0"
								stroke="var(--color-sky-500)"
							>
								<path d="m10.852 14.772-.383.923"></path>
								<path d="M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923"></path>
								<path d="m13.148 9.228.383-.923"></path>
								<path d="m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544"></path>
								<path d="m14.772 10.852.923-.383"></path>
								<path d="m14.772 13.148.923.383"></path>
								<path d="m9.228 10.852-.923-.383"></path>
								<path d="m9.228 13.148-.923.383"></path>
							</g>
						</svg>
					</svg>
				</span>

				<p className="visible w-max translate-0 font-mono text-xl text-(--text-subtle) opacity-100 transition-all transition-discrete duration-800 ease-in-out starting:invisible starting:translate-y-5 starting:opacity-0">
					Server maintenance ongoing
					<span className="text-(--text-muted) *:inline-block">
						<span className="animate-[pulse_1s_infinite_200ms_ease]">.</span>
						<span className="animate-[pulse_1s_infinite__400ms_ease]">.</span>
						<span className="animate-[pulse_1s_infinite_800ms_ease]">.</span>
					</span>
				</p>
			</div>
		</div>
	);
}