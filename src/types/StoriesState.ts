import type { Story } from "./Story";

export type StoriesState = {
	data: Story[];
	isLoading: boolean;
	isError: boolean;
};
