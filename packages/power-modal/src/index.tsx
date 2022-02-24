import React, { FC, useCallback } from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/react";

export interface PowerModalProps {}

export const PowerModal: FC<PowerModalProps> = (props) => {
	const BodyPortal: FC = useCallback(
		(props) => ReactDOM.createPortal(props.children, document.body),
		[]
	);

	const modalWrapperStyles = css`
		background-color: red;
	`;

	return (
		<BodyPortal>
			<div css={modalWrapperStyles}>Test</div>
		</BodyPortal>
	);
};

export default PowerModal;
