import React, { FC, useCallback } from "react";
import ReactDOM from "react-dom";

export interface PowerModalProps {}

export const PowerModal: FC<PowerModalProps> = (props) => {
	const BodyPortal: FC = useCallback(
		(props) => ReactDOM.createPortal(props.children, document.body),
		[]
	);

	return (
		<BodyPortal>
			<div>TEST</div>
		</BodyPortal>
	);
};

export default PowerModal;
