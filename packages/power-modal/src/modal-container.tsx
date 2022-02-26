import React, { FC, useEffect } from "react";
import PropTypes from "prop-types";
import { UsePowerModalStylesValues } from "./styles";

export interface ModalContainerOptions {
	width?: string | null;
}

export interface ModalContainer {
	containerOptions?: ModalContainerOptions;
	stylesValues: UsePowerModalStylesValues;
}

export const ModalContainer: FC<ModalContainer> = (props) => {
	const { containerOptions, stylesValues, children } = props;

	const { modalContainerStyles, setModalContainerStyles } = stylesValues;

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
