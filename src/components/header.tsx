import {
	ListFilter,
	ListSortAscending,
	ListSortDescending,
	LucideSearch,
} from "lucide-react";
import { type ChangeEvent, type ReactNode, useState } from "react";
import filterIcon from "./sort-icon.module.css";

type SearchAction = (formData: FormData) => void;

type SearchFormProps = {
	readonly formAction: SearchAction;
	readonly onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	readonly searchTerm: string;
	readonly onSort: (e: ChangeEvent<HTMLSelectElement>) => void;
};
type HeaderProp = {
	readonly children: ReactNode;
};

export default function Header({ children }: HeaderProp) {
	console.log("Header renders");
	return (
		<header
			className="dark: sticky flex gap-4 between top-0 z-10 bg-(--bg) px-4 pt-8 pb-6 backdrop-blur-sm"
			id="site-header"
		>
			<h1 className="text-center font-mono font-bold tracking-widest text-balance">
				Hacker News Stories
			</h1>
			{children}
		</header>
	);
}

export function SearchForm({
	formAction,
	onSearchInputChange,
	searchTerm,
	onSort,
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
					// disabled={!searchTerm}
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
			{/* Here!! */}

			<div className="relative grid h-10 place-items-center">
				<select
					className="search-filter h-full flex-none appearance-none place-self-stretch rounded-md border-0 px-1 pr-10 pl-2 open:bg-(--bg) open:ring-0 *:hover:bg-(--bg-subtle)"
					name="search-filters"
					onChange={onSort}
				>
					<option value="none">Stories</option>
					<option value="author">Author</option>
					<option value="num_comments">Comment</option>
					<option value="points">Point</option>
					<option value="title">Title</option>
				</select>

				{/* <ListSortAscending
					className={filterIcon.sortIcon}

				/>
				<ListSortDescending
					className={filterIcon.sortIcon}

				/> */}
				<ListFilter
					className={filterIcon.sortIcon}
					id="filter-icon"
					onClick={() => {
						console.log("demclickme");
					}}
				/>
			</div>
		</div>
	);
}
