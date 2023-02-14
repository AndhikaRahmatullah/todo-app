import { useStore } from "../context/store";
import "../styles/Header.css";

const Header = () => {
	const { onAddTodo } = useStore();

	return (
		<div className={onAddTodo ? "container mt-28 flex items-center justify-center blur-lg transition-all duration-500 lg:mt-8 lg:justify-start xl:mt-5" : "container mt-28 flex items-center justify-center transition-all duration-500 lg:mt-8 lg:justify-start xl:mt-5"}>
			<div className="headerLogo h-[100px] w-[250px] md:w-[350px] lg:w-[400px]"></div>
		</div>
	);
};

export default Header;
