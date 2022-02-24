import React, { FC, useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

export interface PowerModalProps {}

export const PowerModal: FC<PowerModalProps> = (props) => {
	const BodyPortal: FC = useCallback(
		(props) => ReactDOM.createPortal(props.children, document.body),
		[]
	);

	const ModalWrapper = styled.div`
		background-color: red;
	`;

	return (
		<BodyPortal>
			<ModalWrapper>Test</ModalWrapper>
		</BodyPortal>
	);
};

export default PowerModal;
