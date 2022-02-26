import React, { FC } from "react";
import { UseModalStylesValues } from "../hooks/use-modal-styles";
import PropTypes from "prop-types";
import { UseModalValues } from "../hooks/use-modal";

export interface ModalWrapperOptions {
	prefixCls?: string | null;
}

export interface ModalWrapperProps {
	wrapperOptions?: ModalWrapperOptions;
	modalValues: UseModalValues;
	stylesValues: UseModalStylesValues;
}

export const ModalWrapper: FC<ModalWrapperProps> = (props) => {
	const { children, modalValues, stylesValues, wrapperOptions = {} } = props;

	const { showModal } = modalValues;
	if (!showModal) return null;

	const { modalWrapperStyles } = stylesValues;
	const { prefixCls } = wrapperOptions;

	return (
		<div css={modalWrapperStyles} className={prefixCls ?? undefined}>
			{children}
		</div>
	);
};

ModalWrapper.propTypes = {
	wrapperOptions: PropTypes.shape({
		prefixCls: PropTypes.string,
	}),
};
