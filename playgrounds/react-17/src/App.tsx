import React, { useEffect, useRef } from "react";
import "./App.css";
import { PowerModal, PowerModalRef } from "@okunofukai/power-modal/src";

function App() {
	const modalRef = useRef<PowerModalRef>({} as PowerModalRef);

	useEffect(() => {
		console.log(modalRef);
	}, [modalRef]);

	return (
		<div className="App">
			<PowerModal ref={modalRef} showOverlay={true} />
		</div>
	);
}

export default App;
