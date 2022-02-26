import React, { FC } from "react";
import { UsePowerModalStylesValues } from "./styles";
import PropTypes from "prop-types";

export interface ModalWrapperOptions {
	prefixCls?: string | null;
}

export interface ModalWrapperProps {
	wrapperOptions?: ModalWrapperOptions;
	stylesValues: UsePowerModalStylesValues;
}

export const ModalWrapper: FC<ModalWrapperProps> = (props) => {
	const { children, stylesValues, wrapperOptions = {} } = props;

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
