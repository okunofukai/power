import { CSSObject } from "@emotion/react";
import React, { FC, forwardRef, useCallback, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { usePowerModalStyles } from "./styles";
import { Overlay, OverlayOptions } from "./Overlay";
import { ModalContainer, ModalContainerOptions } from "./ModalContainer";

export interface PowerModalProps {
	prefixCls?: string;
	overlay?: boolean | OverlayOptions;
	containerOptions?: ModalContainerOptions;
}

export interface PowerModalRef {
	overlayStyles: CSSObject;
	modalWrapperStyles: CSSObject;
	modalContainerStyles: CSSObject;
	setOverlayStyles: (newValue: CSSObject) => void;
	setModalWrapperStyles: (newValue: CSSObject) => void;
	setModalContainerStyles: (newValue: CSSObject) => void;
}

export const PowerModal = forwardRef<PowerModalRef, PowerModalProps>(
	(props, ref) => {
		const { overlay, prefixCls, containerOptions } = props;

		const {
			overlayStyles,
			setOverlayStyles,
			modalWrapperStyles,
			setModalWrapperStyles,
			modalContainerStyles,
			setModalContainerStyles,
		} = usePowerModalStyles();

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

		const ModalWrapper: FC = useCallback(
			(props) => (
				<div css={modalWrapperStyles} className={prefixCls}>
					{props.children}
				</div>
			),
			[modalWrapperStyles, prefixCls]
		);

		return (
			<BodyPortal>
				<ModalWrapper>
					<ModalContainer
						containerOptions={containerOptions}
						modalContainerStyles={modalContainerStyles}
						setModalContainerStyles={setModalContainerStyles}>
						Modal container works!
					</ModalContainer>
					<Overlay
						overlay={overlay}
						overlayStyles={overlayStyles}
						setOverlayStyles={setOverlayStyles}
					/>
				</ModalWrapper>
			</BodyPortal>
		);
	}
);
PowerModal.displayName = "PowerModal";
PowerModal.propTypes = {
	overlay: Overlay.propTypes?.overlay,
	prefixCls: PropTypes.string,
};

export default PowerModal;
