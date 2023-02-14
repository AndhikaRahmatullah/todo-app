import SideNavigation from "./components/SideNavigation";
import Header from "./components/Header";
import Todos from "./components/Todos";
import Add from "./components/Add";

const Layout = () => {
	return (
		<div>
			<SideNavigation />
			<div className="lg:ml-[300px] lg:mr-[100px]">
				<Header />
				<Todos />
				<Add />
			</div>
		</div>
	);
};

export default Layout;
