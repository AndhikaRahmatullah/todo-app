import { useRef, useEffect } from "react";
import { useStore } from "../context/store";
import useCreateDatabase from "../hooks/useCreateDatabase";
import { uid } from "uid";

const Add = () => {
	const id = useRef(`tc${uid(20)}`);
	const { onAddTodo, ChangeStateAddTodo, isLoading, ChangeStateLoading } = useStore();

	useEffect(() => {
		if (isLoading) id.current = `tc${uid(20)}`;
	}, [isLoading]);

	// timestamp
	const currentTimestamp = () => {
		let now = new Date();
		let timestamp = now.getTime();
		return timestamp;
	};

	// set database
	const create = useCreateDatabase();

	// additional data for pengguna database
	const additionalData = async (props) => {
		const { valueVield } = props;
		const path = `/posts/${id.current}`;
		const value = {
			text: valueVield,
			id: id.current,
			created: currentTimestamp(),
		};
		await create.setValue(path, value);
	};

	const cancel = () => {
		const valueVield = document.getElementById("valueField");
		valueVield.value = "";
		ChangeStateAddTodo(false);
	};

	const addTodo = async () => {
		const valueVield = document.getElementById("valueField");
		ChangeStateLoading(true);
		try {
			await additionalData({ valueVield: valueVield.value });
			valueVield.value = "";
			ChangeStateAddTodo(false);
		} catch (error) {
			alert(error.type);
		}
		ChangeStateLoading(false);
	};

	return (
		<div className={onAddTodo ? "fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] transition-all duration-500" : "fixed top-[50%] left-[50%] z-50 hidden translate-x-[-50%] translate-y-[-50%] transition-all duration-500"}>
			<textarea
				id="valueField"
				className="h-[200px] w-[340px] resize-none rounded-2xl border-[3px] border-dark bg-primary p-3 text-base font-medium tracking-wide text-light outline-none md:w-[600px] md:text-lg lg:w-[800px]"></textarea>

			<div className="mt-3 flex justify-center gap-3 md:justify-end">
				<button
					onClick={cancel}
					className="w-[70px] rounded-lg border-[3px] border-dark bg-neutral-500 py-1 text-sm font-medium uppercase tracking-widest text-light md:w-[80px] md:text-base lg:text-lg">
					Batal
				</button>
				<button
					onClick={addTodo}
					className="w-[70px] rounded-lg border-[3px] border-dark bg-primary py-1 text-sm font-medium uppercase tracking-widest text-light md:w-[80px] md:text-base lg:text-lg">
					Buat
				</button>
			</div>
		</div>
	);
};

export default Add;
