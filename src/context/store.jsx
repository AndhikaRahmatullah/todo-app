import { createContext, useContext, useReducer } from "react";

const InitialStoreState = {
	onAddTodo: false,
	isLoading: false,
};

const StoreActions = {
	SET_ONADDTODO: "SET_ONADDTODO",
	SET_ISLOADING: "SET_ISLOADING",
};

const StoreReducer = (state, action) => {
	switch (action.type) {
		case StoreActions.SET_ONADDTODO:
			return { ...state, onAddTodo: action.payload.onAddTodo };
		case StoreActions.SET_ISLOADING:
			return { ...state, isLoading: action.payload.isLoading };

		default:
			break;
	}
};

const StoreContext = createContext();

export const useStore = () => {
	return useContext(StoreContext);
};

const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(StoreReducer, InitialStoreState);

	const ChangeStateAddTodo = (onAddTodo) => {
		dispatch({ type: StoreActions.SET_ONADDTODO, payload: { onAddTodo: onAddTodo } });
	};

	const ChangeStateLoading = (isLoading) => {
		dispatch({ type: StoreActions.SET_ISLOADING, payload: { isLoading: isLoading } });
	};

	return <StoreContext.Provider value={{ ...state, ChangeStateAddTodo, ChangeStateLoading }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
