import { CSSObject } from "@emotion/react";
import React, { FC, forwardRef, useCallback, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { usePowerModalStyles } from "./styles";
import { Overlay, OverlayOptions } from "./Overlay";

export interface PowerModalProps {
	prefixCls?: string;
	overlay?: boolean | OverlayOptions;
	customStylesOverride?: boolean;
}

export interface PowerModalRef {
	setOverlayStyles: (newValue: CSSObject) => void;
	setModalWrapperStyles: (newValue: CSSObject) => void;
	setModalContainerStyles: (newValue: CSSObject) => void;
}

export const PowerModal = forwardRef<PowerModalRef, PowerModalProps>(
	(props, ref) => {
		const { overlay, prefixCls, customStylesOverride } = props;

		const {
			overlayStyles,
			setOverlayStyles,
			modalWrapperStyles,
			setModalWrapperStyles,
			modalContainerStyles,
			setModalContainerStyles,
		} = usePowerModalStyles({
			customStylesOverride,
		});

		useImperativeHandle(ref, () => ({
			overlayStyles,
			setOverlayStyles,
			modalWrapperStyles,
			setModalWrapperStyles,
			modalContainerStyles,
			setModalContainerStyles,
		}));

		const BodyPortal: FC = useCallback(
			(props) => ReactDOM.createPortal(props.children, document.body),
			[]
		);

		return (
			<BodyPortal>
				<div css={modalWrapperStyles} className={prefixCls}>
					<div css={modalContainerStyles}>TEST</div>
					<Overlay
						overlay={overlay}
						overlayStyles={overlayStyles}
						setOverlayStyles={setOverlayStyles}
					/>
				</div>
			</BodyPortal>
		);
	}
);
PowerModal.displayName = "PowerModal";
PowerModal.propTypes = {
	overlay: Overlay.propTypes?.overlay,
	prefixCls: PropTypes.string,
	customStylesOverride: PropTypes.bool,
};

export default PowerModal;
