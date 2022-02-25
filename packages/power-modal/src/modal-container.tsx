import { CSSObject } from "@emotion/react";
import React, { FC, useEffect } from "react";
import PropTypes from "prop-types";

export interface ModalContainerOptions {
	width?: string | null;
}

export interface ModalContainer {
	containerOptions?: ModalContainerOptions;
	modalContainerStyles: CSSObject;
	setModalContainerStyles: (newValue: CSSObject) => void;
}

export const ModalContainer: FC<ModalContainer> = (props) => {
	const {
		containerOptions,
		modalContainerStyles,
		setModalContainerStyles,
		children,
	} = props;

	useEffect(() => {
		if (!containerOptions) return;
		const { width } = containerOptions;
		setModalContainerStyles({
			maxWidth: width || "35rem",
		});
	}, []);

	return <div css={modalContainerStyles}>{children}</div>;
};

ModalContainer.propTypes = {
	containerOptions: PropTypes.shape({
		width: PropTypes.string,
	}),
};
