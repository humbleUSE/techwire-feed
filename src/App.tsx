/** biome-ignore-all lint/suspicious/noCommentText: <deliberate> */
/** biome-ignore-all lint/a11y/noAutofocus: <> */
import axios from "axios";
import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import ErrorPage from "./components/error-page";
import Header, { SearchForm } from "./components/header";
import type { ListSortKey } from "./components/list";
import List from "./components/list";
import LoadingPage from "./components/loadingPage";
import { Main } from "./components/main-section";
import type { Story } from "./types/Story";
import { storiesReducer } from "./utilities/storiesReducer";

const UNIQUE_LOCAL_STORAGE_KEY = (function* getUniqueLocalStorageKey() {
	yield "global-search";
})().next().value as string;

//* The API endpoint in use
// const API_URL = import.meta.env.VITE_API_URL; // vite syntax
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
const HK_MOCK_SERVER = `http://localhost:3001/hits?title:contains=`;

type StoriesFetchInitAction = { type: `STORIES_FETCH_INIT` };
type StoriesFetchSuccessAction = {
	payload: Story[];
	type: `STORIES_FETCH_SUCCESS`;
};
type StoriesFetchFailureAction = { type: `STORIES_FETCH_FAILURE` };
type StoriesRemoveAction = { payload: Story; type: `REMOVE_STORY` };

export type StoriesAction =
	| StoriesFetchInitAction
	| StoriesFetchSuccessAction
	| StoriesFetchFailureAction
	| StoriesRemoveAction;

export type ListSortState = { isReversed: boolean; sortKey: ListSortKey };

//* App Component
export default function App() {
	console.log("App renders");

	//* states
	const [searchTerm, setSearchTerm] = useStorageState(
		UNIQUE_LOCAL_STORAGE_KEY,
		"",
	);

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
				const urlResult = await axios.get(url);
				// const mockServerResult = await axios.get(mockURL);
				// data fetched success
				dispatchStories({
					payload: urlResult.data.hits,
					// payload: mockServerResult.data,
					type: `STORIES_FETCH_SUCCESS`,
				});

				console.log("Data retrieval: Success!");
			} catch (err) {
				// data fetched failed
				dispatchStories({ type: `STORIES_FETCH_FAILURE` });
				if (err instanceof Error)
					console.log(`Fetch failed ${err.message}`);
			}
		})();
	}, [url]);

	//* useEffect to fetch stories asynchronously form hacker news server
	useEffect(() => {
		console.log(`handleFetchStories useEffect run`);
		handleFetchStories();
	}, [handleFetchStories]);

	//* custom Hook
	function useStorageState(key: string, initialState: string) {
		console.log("useStorageState useEffect  run");

		const isMounted = useRef(false);
		const [value, setValue] = useState(
			localStorage.getItem(key) || initialState,
		);

		useEffect(() => {
			if (!isMounted.current) {
				isMounted.current = true;
				console.log("useStorageState useEffect first render");
			} else {
				localStorage.setItem(key, value);
				console.log("useStorageState useEffect run on re-render");
			}
		}, [key, value]);

		return [value, setValue] as const;
	}

	//* handler for deleting a story
	const handleRemoveStory = useCallback(
		(item: Story) => {
			console.log("handleRemoveStory run");

			dispatchStories({ payload: item, type: "REMOVE_STORY" });
		},
		[dispatchStories],
	);

	//* search handler
	function handleSearchForm(event: ChangeEvent<HTMLInputElement>) {
		console.log("handleSearch run");
		setSearchTerm(event.target.value);
	}

	//* list sort state
	const [sort, setSort] = useState<ListSortState>({
		isReversed: false,
		sortKey: "none",
	});

	//* handle grabbing the sort key for list
	function handleSort(e: ChangeEvent<HTMLSelectElement>) {
		const sortKey = e.target.value as ListSortKey;
		const isReversed = sort.sortKey === sortKey && !sort.isReversed;
		setSort({ isReversed, sortKey });
	}

	//* form action for submission
	function searchAction() {
		setUrl(`${API_ENDPOINT}${searchTerm}`);
		setMockURL(`${HK_MOCK_SERVER}${searchTerm}`);
	}

	return (
		<>
			{stories.isError && <ErrorPage />}
			{stories.isLoading ? (
				<LoadingPage />
			) : (
				!stories.isError && (
					<div id="App">
						<Header>
							<SearchForm
								formAction={searchAction}
								onSearchInputChange={handleSearchForm}
								onSort={handleSort}
								searchTerm={searchTerm}
							/>
						</Header>

						<Main>
							<List
								list={stories.data}
								onRemoveItem={handleRemoveStory}
								sortOptions={sort}
							/>
						</Main>
					</div>
				)
			)}
		</>
	);
}
