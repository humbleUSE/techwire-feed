/** biome-ignore-all lint/suspicious/noCommentText: <deliberate> */
/** biome-ignore-all lint/a11y/noAutofocus: <> */
import axios from "axios";
import {
	CircleIcon,
	GlobeIcon,
	LucideChartNoAxesColumn,
	LucideMessageCircle,
	LucideSearch,
	Trash2,
	Users2Icon,
} from "lucide-react";
import {
	type ChangeEvent,
	memo,
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import styles from "./App.module.css";

// Typescript types
type Story = {
	objectID: string;
	url: string;
	title: string;
	author: string;
	num_comments: number;
	points: number;
};

const UNIQUE_LOCAL_STORAGE_KEY = (function* getUniqueLocalStorageKey() {
	yield "global-search";
})().next().value as string;

//* The API endpoint in use
// const API_URL = import.meta.env.VITE_API_URL; // vite syntax
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
const HK_MOCK_SERVER = `http://localhost:3001/hits?title:contains=`;

type StoriesState = {
	data: Story[];
	isLoading: boolean;
	isError: boolean;
};

type StoriesFetchInitAction = { type: `STORIES_FETCH_INIT` };
type StoriesFetchSuccessAction = {
	payload: Story[];
	type: `STORIES_FETCH_SUCCESS`;
};
type StoriesFetchFailureAction = { type: `STORIES_FETCH_FAILURE` };
type StoriesRemoveAction = { payload: Story; type: `REMOVE_STORY` };

type StoriesAction =
	| StoriesFetchInitAction
	| StoriesFetchSuccessAction
	| StoriesFetchFailureAction
	| StoriesRemoveAction;

//* Stories Reducer function
const storiesReducer = (state: StoriesState, action: StoriesAction) => {
	switch (action.type) {
		case `STORIES_FETCH_INIT`:
			return { ...state, isError: false, isLoading: true };

		case `STORIES_FETCH_SUCCESS`:
			return {
				...state,
				data: action.payload,
				isError: false,
				isLoading: false,
			};

		case `STORIES_FETCH_FAILURE`:
			return { ...state, isError: true, isLoading: false };

		case `REMOVE_STORY`: {
			const filteredStories = state.data.filter(
				(story) => story.objectID !== action.payload.objectID,
			);

			return { ...state, data: filteredStories };
		}

		default: {
			const _exhaustive: never = action;
			throw new Error(`Unknown action: ${_exhaustive?.type}`);
		}
	}
};

//* App Component
export default function App() {
	console.log("App renders");

	//* states
	const [searchTerm, setSearchTerm] = useStorageState(UNIQUE_LOCAL_STORAGE_KEY,'');

	const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
	const [mockURL, setMockURL] = useState(`${HK_MOCK_SERVER}${searchTerm}`);
	const [stories, dispatchStories] = useReducer(storiesReducer, {
		//* initial state
		data: [],
		isError: false,
		isLoading: false,
	});

	const handleFetchStories = useCallback(() => {
		(async function loadStories() {
			// fetching initialized
			dispatchStories({ type: "STORIES_FETCH_INIT" });

			try {
				// const urlResult = await axios.get(url);
				const mockServerResult = await axios.get(mockURL);
				// data fetched success
				dispatchStories({
					// payload: urlResult.data.hits,
					payload: mockServerResult.data,
					type: `STORIES_FETCH_SUCCESS`,
				});

				console.log("Data retrieval: Success!");
			} catch (err) {
				// data fetched failed
				dispatchStories({ type: `STORIES_FETCH_FAILURE` });
				if (err instanceof Error) console.log(`Fetch failed ${err.message}`);
			}
		})();
	}, [mockURL, url]);
	/* deps array ensures the function is recreated only if "url" changes consequently calling useEffect bellow */

	//* useEffect to fetch stories asynchronously form hacker news server
	useEffect(() => {
		handleFetchStories();
	}, [handleFetchStories]);

	//* custom Hook
	function useStorageState(key: string, initialState: string) {
		const isMounted = useRef(false);
		const [value, setValue] = useState(
			localStorage.getItem(key) || initialState,
		);

		useEffect(() => {
			console.log("useStorageState useEffect run");
			if (!isMounted.current) {
				isMounted.current = true;
			} else {
				localStorage.setItem(key, value);
			}
		}, [key, value]);

		return [value, setValue] as const;
	}

	//* handler for deleting a story
	const handleRemoveStory = useCallback((item: Story) => {
		console.log("handleRemoveStory run");

		dispatchStories({ payload: item, type: "REMOVE_STORY" });
	}, []);

	//* search handler
	function handleSearchForm(event: ChangeEvent<HTMLInputElement>) {
		console.log("handleSearch run");
		setSearchTerm(event.target.value);
	}

	function searchAction() {
		setUrl(`${API_ENDPOINT}${searchTerm}`);
		setMockURL(`${HK_MOCK_SERVER}${searchTerm}`);
	}

	return (
		<>
			{stories.isError && <ErrorScreen />}
			{stories.isLoading ? (
				<LoadingScreen />
			) : (
				!stories.isError && (
					<div id="App">
						<Header
							{...{
								handleSearchForm,
								searchAction,
								searchTerm,
							}}
						/>
						<Main list={stories.data} onRemoveItem={handleRemoveStory} />
					</div>
				)
			)}
		</>
	);
}

// other components
type ItemProps = {
	item: Story;
	onRemoveItem: onRemoveItem;
};
const Item = memo(function Item({ item, onRemoveItem }: ItemProps) {
	console.log("Item renders");
	const { title, url, author, num_comments, points, objectID } = item;

	return (
		<li
			className="item group/framework-card flex flex-col justify-between gap-4 overflow-hidden rounded-xl border-2 border-(--border) bg-(--card-bg) p-4 opacity-100 transition-all transition-discrete duration-150 ease-linear hover:-translate-y-1 not-dark:hover:shadow-md starting:block starting:opacity-0"
			id={objectID}
		>
			<div className="space-y-2 text-balance">
				<div className="title flex items-center justify-between gap-4 text-base">
					<a
						className="group/title-link title line-clamp-2 text-balance text-(--text) no-underline transition-all hover:text-(--text-hover-link) hover:underline hover:underline-offset-1 active:text-(--accent)"
						href={url}
					>
						{title}
					</a>

					<button
						className="group/del-btn trash-icon invisible grid aspect-square shrink-0 place-items-center rounded-sm border-2 border-(--border) bg-black/10 p-2 opacity-0 transition-[color,background,opacity,display,visibility] transition-discrete duration-400 ease-out group-hover/framework-card:visible group-hover/framework-card:opacity-100 hover:border-2 hover:border-red-500/20 hover:bg-red-800/10 active:scale-85 dark:hover:border-red-500 dark:hover:bg-[#bb071d26] group-hover/framework-card:starting:opacity-0"
						onClick={() => onRemoveItem(item)}
						type="button"
					>
						<Trash2
							className="scale-60 transition-all duration-80 group-hover/framework-card:scale-100 group-hover/framework-card:group-hover/del-btn:scale-110 group-active/del-btn:text-red-500"
							size={"1.5ex"}
							strokeWidth={2}
						/>
					</button>
				</div>
			</div>

			<ul className="meta -mx-4 -mb-4 space-y-1 bg-(--bg-muted) px-4 py-4 font-mono text-sm text-(--text-subtle) *:text-left [&_svg]:text-(--accent)">
				<li className="author flex items-center gap-1">
					<Users2Icon />

					<span className="line-clamp-1 text-ellipsis">Author: {author}</span>
				</li>
				<div className="grid grid-cols-2 gap-1">
					<li className="comments">
						<span className="flex items-center gap-0.75">
							<LucideMessageCircle strokeWidth={3} />

							<span>Comments: {num_comments}</span>
						</span>
					</li>
					<li className="points">
						<span className="flex items-center gap-0.75">
							<LucideChartNoAxesColumn size={"1.5ex"} strokeWidth={3} />

							<span>Points: {points}</span>
						</span>
					</li>
				</div>
			</ul>
		</li>
	);
});

type ListProps = {
	readonly list: Story[];
	readonly onRemoveItem: onRemoveItem;
};
type onRemoveItem = (item: Story) => void;

function List({ list, onRemoveItem }: ListProps) {
	console.log("List renders");
	return (
		<ul className={styles.list}>
			{list.map((item) => {
				return <Item {...{ item, onRemoveItem }} key={item.objectID} />;
			})}
		</ul>
	);
}
type SearchFormProps = {
	readonly formAction: SearchAction;
	readonly onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	readonly searchTerm: string;
};

function SearchForm({
	formAction,
	onSearchInputChange,
	searchTerm,
}: SearchFormProps) {
	console.log("Search renders");
	return (
		<div className="flex items-center justify-center gap-2">
			<form
				action={formAction}
				className="group ease flex cursor-text items-center gap-2 border border-b-6 border-transparent border-b-(--accent)/50 px-2 py-2 text-(--text-muted) ring-0 transition-[color,ring] focus-within:rounded-sm focus-within:border-transparent focus-within:ring-2 focus-within:ring-(--accent) focus-within:outline-0 focus:rounded-sm"
				id="search"
			>
				{/* HTML search input */}
				<input
					className="incremental shrink font-mono text-sm font-bold ring-0 outline-0 transition-colors placeholder-shown:text-(--text-muted) focus-within:placeholder:text-(--accent)/50 focus:outline-0"
					id="search-input"
					onChange={onSearchInputChange}
					placeholder="Search news"
					type="search"
					value={searchTerm}
				/>
				{/* HTML confirm search button */}
				<button
					className="bg-(--accent)/20 p-1 active:scale-[0.8]"
					disabled={!searchTerm}
					type="submit"
				>
					{
						<LucideSearch
							className="size-4 transition-colors group-focus-within:text-(--accent)"
							strokeWidth={2}
						/>
					}
				</button>
			</form>
		</div>
	);
}
type SearchAction = (formData: FormData) => void;
type HeaderProp = {
	readonly searchTerm: string;
	readonly handleSearchForm: (e: ChangeEvent<HTMLInputElement>) => void;
	readonly searchAction: SearchAction;
};

function Header({ handleSearchForm, searchTerm, searchAction }: HeaderProp) {
	console.log("Header renders");
	return (
		<header className="sticky top-0 z-10 space-y-4 bg-(--bg)/80 px-4 pt-8 pb-6 backdrop-blur-sm">
			<h1 className="text-center font-mono font-bold tracking-widest text-balance">
				Hacker News Stories
			</h1>
			<SearchForm
				formAction={searchAction}
				onSearchInputChange={handleSearchForm}
				searchTerm={searchTerm}
			/>
		</header>
	);
}
function ErrorScreen() {
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

function LoadingScreen() {
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
					<span className="animate-[pulse_1s_infinite_200ms_ease]">.</span>
					<span className="animate-[pulse_1s_infinite__400ms_ease]">.</span>
					<span className="animate-[pulse_1s_infinite_800ms_ease]">.</span>
				</span>
			</p>
		</div>
	);
}
type MainProps = {
	readonly list: Story[];
	readonly onRemoveItem: (item: Story) => void;
};
const Main = memo(function Main({ list, onRemoveItem }: MainProps) {
	return (
		<main>
			<section className="frameworks space-y-8 pt-6">
				{<List {...{ list, onRemoveItem }} />}
			</section>
		</main>
	);
});
