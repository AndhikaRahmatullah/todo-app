import { useRef, useEffect, useState } from "react";
import { useStore } from "../context/store";
import useGetDatabase from "../hooks/useGetDatabase";
import useRemoveDatabase from "../hooks/useRemoveDatabase";
import useUpdateDatabase from "../hooks/useUpdateDatabase";
import useGetQueryDatabase from "../hooks/useGetQueryDatabase";
import { equalTo, limitToFirst, limitToLast, startAt, startAfter, endAt, endBefore } from "firebase/database";

const Todos = () => {
	const postsDatabase = useRef({});
	const { onAddTodo, ChangeStateAddTodo, isLoading, ChangeStateLoading } = useStore();

	// const queryPosts = useGetQueryDatabase({
	// 	path: "posts",
	// 	type: "child",
	// 	child: "created",
	// 	queries: [startAt(0)],
	// });

	// get posts database
	const getPosts = useGetDatabase("posts", true);
	const { dbValue, getValueLater } = getPosts;

	// descending / mengurutkan data dari yang terbaru ke yang terlama
	dbValue &&
		dbValue.sort(function (a, b) {
			return b.created - a.created;
		});

	// rerender data after add
	useEffect(() => {
		if (!onAddTodo) getValueLater();
	}, [onAddTodo]);

	// rerender data after delete or update
	useEffect(() => {
		if (isLoading) getValueLater();
	}, [isLoading]);

	// set remove database
	const remove = useRemoveDatabase();

	// remove todo
	const deleteTodo = async (e) => {
		ChangeStateLoading(true);
		try {
			const endPoint = e.target.id;
			const path = `/posts/${endPoint}`;
			await remove.removeValue(path);
		} catch (error) {
			alert(error.type);
		}
		ChangeStateLoading(false);
	};

	// set update database
	const update = useUpdateDatabase();

	// update finish todo
	const setFinishTodo = async (id) => {
		const path = `/posts/${id}`;
		const value = {
			finish: true,
		};
		await update.updateDoc(path, value);
	};

	// finish todo
	const updateTodo = async (e) => {
		ChangeStateLoading(true);
		const id = e.target.id;
		try {
			await setFinishTodo(id);
		} catch (error) {
			alert(error.type);
		}
		ChangeStateLoading(false);
	};

	return (
		<div className={onAddTodo ? "container py-20 blur-lg transition-all duration-500" : "container py-20 transition-all duration-500"}>
			{/* activity */}
			<div className="flex flex-col gap-8">
				{dbValue &&
					dbValue.map((i) => {
						return (
							<div
								key={i.id}
								className="flex flex-col items-center gap-5 md:flex-row">
								<div className={i.finish ? "-z-10 w-[300px] rounded-lg bg-primary px-2 py-3 shadow-lg shadow-dark/30 grayscale transition-all duration-500 md:w-[700px]" : "-z-10 w-[300px] rounded-lg bg-primary px-2 py-3 shadow-lg shadow-dark/30 transition-all duration-500 md:w-[700px]"}>
									<p className="text-lg font-bold tracking-wider text-light">{i.text}</p>
								</div>

								<div className="flex gap-3">
									<button
										onClick={deleteTodo}
										id={i.id}
										className="text-base font-bold tracking-wide text-dark/50 underline decoration-transparent transition-all duration-300 hover:decoration-dark/50 md:text-lg">
										Hapus
									</button>
									<button
										onClick={updateTodo}
										id={i.id}
										className={i.finish ? "hidden transition-all duration-300" : "text-base font-bold tracking-wide text-primary underline decoration-transparent transition-all duration-300 hover:decoration-primary md:text-lg"}>
										Selesai
									</button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Todos;
