import { orderBy } from "es-toolkit";
import {
	LucideChartNoAxesColumn,
	LucideMessageCircle,
	Trash2,
	Users2Icon,
} from "lucide-react";
import { memo } from "react";
import type { ListSortState } from "../App";
import styles from "../styles/compositions.module.css";
import type { OnRemoveItem } from "../types/OnRemoveItem";
import type { Story } from "../types/Story";

export type ListSortKey =
	"none" | "author" | "points" | "num_comments" | "title";
// export type ListSortKey = "none" | keyof Omit<Story, "objectID" | "url">;
type ListSortFunc = (list: Story[]) => Story[];

type ListProps = {
	readonly list: Story[];
	readonly onRemoveItem: OnRemoveItem;
	readonly sortOptions: ListSortState;
};

type ItemProps = {
	item: Story;
	onRemoveItem: OnRemoveItem;
};

export default function List({ list, onRemoveItem, sortOptions }: ListProps) {
	console.log("List renders");

	function sortOrder() {
		const order = sortOptions.isReversed ? "desc" : "asc";
		return [order] as const;
	}
	//* Dictionary for sorting functions
	const SORTS: Record<ListSortKey, ListSortFunc> = {
		author: (list) =>
			orderBy(
				list,
				[(story) => story.author.toLocaleLowerCase()],
				sortOrder(),
			),
		none: (list) => list,
		num_comments: (list) => orderBy(list, ["num_comments"], sortOrder()),
		points: (list) => orderBy(list, ["points"], sortOrder()),
		title: (list) =>
			orderBy(
				list,
				[(story) => story.title.toLocaleLowerCase()],
				sortOrder(),
			),
	};

	const sortFunction = SORTS[sortOptions.sortKey];

	const sortedList = sortFunction(list);

	return (
		<ul className={styles.list}>
			{sortedList.map((item) => (
				<Item
					item={item}
					key={item.objectID}
					onRemoveItem={onRemoveItem}
				/>
			))}
		</ul>
	);
}

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

			<ul className="meta -mx-4 -mb-4 space-y-1 bg-(--bg-muted) px-4 py-4 font-mono text-sm text-(--text-subtle) *:text-left [&_svg]:w-[1.5ex] [&_svg]:text-(--accent)">
				<li className="author flex items-center gap-1">
					<Users2Icon />

					<span className="line-clamp-1 text-ellipsis">
						Author: {author}
					</span>
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
							<LucideChartNoAxesColumn
								size={"1.5ex"}
								strokeWidth={3}
							/>

							<span>Points: {points}</span>
						</span>
					</li>
				</div>
			</ul>
		</li>
	);
});
