import type { StoriesAction } from "../app";
import type { StoriesState } from "../types/StoriesState.";

//* Stories Reducer function
export function storiesReducer(state: StoriesState, action: StoriesAction) {
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
			throw new Error(`Unknown action: ${_exhaustive}`);
		}
	}
}
