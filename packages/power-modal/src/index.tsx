import { CSSObject } from "@emotion/react";
import React, { FC, useCallback } from "react";
import ReactDOM from "react-dom";

export interface PowerModalProps {
	showOverlay?: boolean;
}

export const PowerModal: FC<PowerModalProps> = (props) => {
	const { showOverlay } = props;

	const BodyPortal: FC = useCallback(
		(props) => ReactDOM.createPortal(props.children, document.body),
		[]
	);

	const modalWrapperStyles = {
		color: "yellow",
	} as CSSObject;

	const overlayStyles = {
		position: "fixed",
		height: "100vh",
		width: "100vw",
		top: "0",
		left: "0",
		zIndex: -1,
		backgroundColor: "rgba(0,0,0,0.45)",
	} as CSSObject;

	return (
		<BodyPortal>
			<div css={modalWrapperStyles}>
				<div></div>
				{showOverlay && <div css={overlayStyles} />}
			</div>
		</BodyPortal>
	);
};

export default PowerModal;
