import { useEffect } from "react";
import { useStore } from "../context/store";
import useGetDatabase from "../hooks/useGetDatabase";
import useGetQueryDatabase from "../hooks/useGetQueryDatabase";
import { equalTo, limitToFirst, limitToLast, startAt, startAfter, endAt, endBefore } from "firebase/database";
import { currentDate } from "../utils/date";
import "../styles/SideNavigation.css";

const SideNavigation = () => {
	const { onAddTodo, ChangeStateAddTodo, isLoading } = useStore();

	const addTodo = () => {
		ChangeStateAddTodo(true);
	};

	// filtering : finish = true
	const queryPosts = useGetQueryDatabase({
		path: "posts",
		type: "child",
		child: "finish",
		queries: [equalTo(true)],
	});

	const countingFinishTodo = () => {
		if (queryPosts.snapshot) {
			const objectQuery = Object.values(queryPosts.snapshot);
			const objectValues = objectQuery.length;
			return objectValues;
		}
	};

	// get posts database
	const getPosts = useGetDatabase("posts", true);
	const { dbValue, getValueLater } = getPosts;

	useEffect(() => {
		if (!isLoading) {
			queryPosts.queryLater();
			getValueLater();
		}
	}, [isLoading]);

	return (
		<div className={onAddTodo ? "fixed top-0 left-0 blur-lg transition-all duration-500 lg:top-auto lg:bottom-0 lg:block" : "fixed top-0 left-0 transition-all duration-500 lg:top-auto lg:bottom-0 lg:block"}>
			<div className="relative z-10 flex h-[100px] w-screen flex-row items-center justify-between bg-primary py-14 px-5 shadow-lg shadow-dark/50 lg:h-screen lg:w-[250px] lg:flex-col lg:items-start lg:justify-start lg:shadow-none xl:h-[650px] xl:rounded-tr-[100px]">
				{/* add */}
				<div
					onClick={addTodo}
					className={onAddTodo ? "flex w-fit cursor-default items-center gap-3 rounded-full bg-light py-2 px-4 shadow-lg shadow-dark/30 transition-all duration-500 hover:shadow-none" : "flex w-fit cursor-pointer items-center gap-3 rounded-full bg-light py-2 px-4 shadow-lg shadow-dark/30 transition-all duration-500 hover:shadow-none"}>
					<div className="addLogo h-[20px] w-[20px] md:h-[30px] md:w-[30px]"></div>
					<p className="text-base font-bold uppercase tracking-wider text-primary md:text-xl">Tambah</p>
				</div>

				{/* stats */}
				<div className="flex flex-row gap-5 lg:mt-16 lg:flex-col">
					<div className="flex items-center gap-2">
						<div className="totalLogo hidden h-[25px] w-[25px] sm:block"></div>
						<p className="text-sm font-medium uppercase tracking-wider text-light md:text-base">Total : {dbValue && dbValue.length ? dbValue.length : "0"}</p>
					</div>
					<div className="hidden items-center gap-2 md:flex">
						<div className="successLogo h-[25px] w-[25px]"></div>
						<p className="text-base font-medium uppercase tracking-wider text-light">Selesai : {countingFinishTodo() ? countingFinishTodo() : "0"}</p>
					</div>
				</div>

				{/* date */}
				<div className="absolute bottom-2 left-[50%] hidden w-full translate-x-[-50%] lg:block">
					<p className="text-center text-xs font-bold uppercase tracking-wider text-light opacity-50">{currentDate()}</p>
				</div>
			</div>
		</div>
	);
};

export default SideNavigation;
