import { CSSObject } from "@emotion/react";
import React, { FC, forwardRef, useCallback, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { usePowerModalStyles } from "./styles";
import { Overlay, OverlayOptions } from "./overlay";
import { ModalContainer, ModalContainerOptions } from "./modal-container";
import { ModalContent, ModalContentOptions } from "./modal-content";
import { ModalBody } from "./modal-body";

export interface PowerModalProps {
	prefixCls?: string;
	overlay?: boolean | OverlayOptions;
	containerOptions?: ModalContainerOptions;
	contentOptions?: ModalContentOptions;
}

export interface PowerModalRef {
	overlayStyles: CSSObject;
	setOverlayStyles: (newValue: CSSObject) => void;
	modalWrapperStyles: CSSObject;
	setModalWrapperStyles: (newValue: CSSObject) => void;
	modalContainerStyles: CSSObject;
	setModalContainerStyles: (newValue: CSSObject) => void;
	modalContentStyles: CSSObject;
	setModalContentStyles: (newValue: CSSObject) => void;
	modalBodyStyles: CSSObject;
	setModalBodyStyles: (newValue: CSSObject) => void;
}

export const PowerModal = forwardRef<PowerModalRef, PowerModalProps>(
	(props, ref) => {
		const { overlay, prefixCls, containerOptions, contentOptions } = props;

		const {
			overlayStyles,
			setOverlayStyles,
			modalWrapperStyles,
			setModalWrapperStyles,
			modalContainerStyles,
			setModalContainerStyles,
			modalContentStyles,
			setModalContentStyles,
			modalBodyStyles,
			setModalBodyStyles,
		} = usePowerModalStyles();

		useImperativeHandle(ref, () => ({
			overlayStyles,
			setOverlayStyles,
			modalWrapperStyles,
			setModalWrapperStyles,
			modalContainerStyles,
			setModalContainerStyles,
			modalContentStyles,
			setModalContentStyles,
			modalBodyStyles,
			setModalBodyStyles,
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
						<ModalContent
							contentOptions={contentOptions}
							modalContentStyles={modalContentStyles}
							setModalContentStyles={setModalContentStyles}>
							<ModalBody
								modalBodyStyles={modalBodyStyles}
								setModalBodyStyles={setModalBodyStyles}>
								Modal container works!
							</ModalBody>
						</ModalContent>
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
	containerOptions: ModalContainer.propTypes?.containerOptions,
};

export default PowerModal;
