import { CSSObject } from "@emotion/react";
import React, { FC, forwardRef, useCallback, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { usePowerModalStyles, UsePowerModalStylesValues } from "./styles";
import { Overlay, OverlayOptions } from "./overlay";
import { ModalContainer, ModalContainerOptions } from "./modal-container";
import { ModalContent, ModalContentOptions } from "./modal-content";
import { ModalBody } from "./modal-body";
import { ModalWrapper, ModalWrapperOptions } from "./modal-wrapper";

export interface PowerModalProps {
	overlay?: boolean | OverlayOptions;
	wrapperOptions?: ModalWrapperOptions;
	containerOptions?: ModalContainerOptions;
	contentOptions?: ModalContentOptions;
}

export type PowerModalRef = UsePowerModalStylesValues;

export const PowerModal = forwardRef<PowerModalRef, PowerModalProps>(
	(props, ref) => {
		const { overlay, wrapperOptions, containerOptions, contentOptions } =
			props;

		const stylesValues = usePowerModalStyles();

		useImperativeHandle(ref, () => ({
			...stylesValues,
		}));

		const BodyPortal: FC = useCallback(
			(props) => ReactDOM.createPortal(props.children, document.body),
			[]
		);

		return (
			<BodyPortal>
				<ModalWrapper
					wrapperOptions={wrapperOptions}
					stylesValues={stylesValues}>
					<ModalContainer
						containerOptions={containerOptions}
						stylesValues={stylesValues}>
						<ModalContent
							contentOptions={contentOptions}
							stylesValues={stylesValues}>
							<ModalBody stylesValues={stylesValues}>
								Modal body works!
							</ModalBody>
						</ModalContent>
					</ModalContainer>
					<Overlay overlay={overlay} stylesValues={stylesValues} />
				</ModalWrapper>
			</BodyPortal>
		);
	}
);
PowerModal.displayName = "PowerModal";
PowerModal.propTypes = {
	overlay: Overlay.propTypes?.overlay,
	wrapperOptions: ModalWrapper.propTypes?.wrapperOptions,
	containerOptions: ModalContainer.propTypes?.containerOptions,
	contentOptions: ModalContent.propTypes?.contentOptions,
};

export default PowerModal;
