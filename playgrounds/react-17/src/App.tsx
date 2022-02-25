import React, { useEffect, useRef } from "react";
import "./App.css";
import { PowerModal, PowerModalRef } from "@okunofukai/power-modal/src";

function App() {
	const modalRef = useRef<PowerModalRef>({} as PowerModalRef);

	useEffect(() => {
		modalRef.current.setOverlayStyles({});
	}, [modalRef]);

	return (
		<div className="App">
			<button onClick={console.log}>Button</button>
			<PowerModal ref={modalRef} />
		</div>
	);
}

export default App;
