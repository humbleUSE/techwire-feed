import react, { Children } from "react";

interface MainProps {
	children: react.ReactNode;
}
export const Main = react.memo(function Main({ children }: MainProps) {
	return (
		<main >
			<section className="stories bg-(--bg) space-y-8 px-4 pt-6">
				{Children.only(children)}
			</section>
		</main>
	);
});
