import Layout from "./Layout";
import StoreProvider from "./context/store";

function App() {
	return (
		<StoreProvider>
			<Layout />
		</StoreProvider>
	);
}

export default App;
