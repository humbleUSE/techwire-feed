import { type ChangeEvent, type ReactNode, useRef, useState } from "react";

const age = 30;
const name: string = "ada";
const isActive: boolean = true;
const tags: string[] = ["admin", "editor"];
const coords: [number, number] = [6.5, 3.3] as const;

const o = { age, coords, isActive, name, tags };
console.log(typeof age);

for (const key in o) {
	if (!Object.hasOwn(o, key)) continue;
}

// Interface
interface UserInterface {
	readonly createdAt: string;
	email?: string;
	id: number;
	name: string;
}

type UserType = {
	id: number;
	name: string;
	readonly createdAt: string;
	email?: string;
};

// Union
type Status = "loading" | "success" | "error";

function showStatus(status: Status) {
	if (status === "loading") return "Please wait...";
}

const a: Status = "loading";
console.log(showStatus(a));

// Intersection
type WithId = { id: number };
type WithName = { name: string };
type Person = WithId & WithName;

const joe = { id: 1, name: "joe" };
const person: Person = joe;

// Generics
function wrapInArray<T>(value: T): T[] {
	return [value];
}

wrapInArray(5);
wrapInArray("hello");
wrapInArray(person);

function wrapInArray2<T extends WithId | WithName>(value: T) {
	return [value];
}

wrapInArray2(person);
wrapInArray2({ id: 2 });
wrapInArray2({ name: "joe" });

// narrowing
function printId(id: string | number) {
	if (typeof id === "string") console.log(id.toUpperCase());
	else console.log(id.toFixed(2));
}

printId("next");
printId(20.44);

// utility Types
interface User2 {
	email: string;
	id: number;
	name: string;
}

type PartialUser = Partial<User2>;
type myPartialUser = { [P in keyof User2]?: User2[P] };
type UserPreview = Pick<User2, "name" | "id">;
type UserWithoutEmail = Omit<User2, "email">;
type ReadonlyUser = Readonly<User2>;

// const preview: UserPreview = { id: 2, name: "joe" };

// TypeScript  + React:Typing Components
interface ButtonProps {
	readonly disabled?: boolean;
	readonly label: string;
	readonly onClick: () => void;
}
interface Button2Props {
	disabled?: boolean;
	label: string;
	onClick: () => void;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
	return (
		<button disabled={disabled} onClick={onClick} type="button">
			{label}
		</button>
	);
}

function Button2({ label, onClick, disabled = false }: Readonly<Button2Props>) {
	return (
		<button disabled={disabled} onClick={onClick} type="button">
			{label}
		</button>
	);
}

interface CardProps {
	readonly children: ReactNode;
	readonly title: string;
}

function Card({ title, children }: CardProps) {
	return (
		<div>
			<h2>{title}</h2>
			{children}
		</div>
	);
}

export default Card;

// useState
// const [isOpen, setIsOpen] = useState<boolean>(true);
// const [items, setItems] = useState<string[]>([]);
// const [user, setUser] = useState<User2 | null>(null);

function SearchBox() {
	const [query, setQuery] = useState("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};
	return <input onChange={handleChange} type="text" value={query} />;
}

// useRef

function TextInput() {
	const inputRef = useRef<HTMLInputElement>(null);
	const focus = () => inputRef.current?.focus();
	return <input ref={inputRef} type="text" />;
}

// generic components
interface ListProps<T> {
	items: T[];
	renderItem: (item: T) => ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
	return (
		<ul>
			{items.map((item, i) => (
				<li key={i}>{renderItem(item)}</li>
			))}
		</ul>
	);
}
const users = ["s", "a", "p"];
const userToSpan = (user: string) => <span>{user}</span>;

// keyof + generics
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}

const person1 = { id: 1, name: "Ada" };
console.log(getProp(person1, "id"));

interface ApiResponse<T = unknown> {
	data: T;
	status: number;
}
const user = { email: "skdkd@gmail", id: 1, name: "jane Doe" };
const res: ApiResponse = { data: "anything", status: 200 };
const res2: ApiResponse<string> = { data: "anything", status: 200 };
const res3: ApiResponse<User2> = { data: user, status: 200 };

interface Box<T> {
	set: (v: T) => void;
	value: T;
}

const numberBox: Box<number> = {
	set(v) {
		this.value = v;
	},
	value: 2,
};

// Function types
type MathOp = (a: number, b: number) => number;

const add: MathOp = (a, b) => a + b;
const subtract: MathOp = (a, b) => a - b;

// this in function signatures
function handleClick(this: HTMLButtonElement, event: MouseEvent) {
	this.disabled = true; // TS knows its a button
}

// Discriminated unions
type RequestState =
	| { status: "idle" }
	| { status: "loading" }
	| { status: "success"; data: string }
	| { status: "error"; message: string };

function render(state: RequestState) {
	switch (state.status) {
		case "idle":
			return "Waiting to start";
		case "loading":
			return "Loading...";
		case "success":
			return state.data;
		case "error":
			return state.message;

		default: {
			const _exhaustive: never = state;
			return _exhaustive;
		}
	}
}
