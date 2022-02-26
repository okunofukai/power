import React, {
	ReactNode,
	FC,
	forwardRef,
	useCallback,
	useImperativeHandle,
} from "react";
import ReactDOM from "react-dom";
import { useModalStyles, UseModalStylesValues } from "./hooks/use-modal-styles";
import { Overlay, OverlayOptions } from "./ui/overlay";
import { ModalContainer, ModalContainerOptions } from "./ui/modal-container";
import { ModalContent, ModalContentOptions } from "./ui/modal-content";
import { ModalBody } from "./ui/modal-body";
import { ModalWrapper, ModalWrapperOptions } from "./ui/modal-wrapper";
import PropTypes from "prop-types";
import { useModal, UseModalValues } from "./hooks/use-modal";

export interface PowerModalProps {
	children?: ReactNode | null;
	visible?: boolean;
	overlay?: boolean | OverlayOptions;
	wrapperOptions?: ModalWrapperOptions;
	containerOptions?: ModalContainerOptions;
	contentOptions?: ModalContentOptions;
}

export type PowerModalRef = UseModalStylesValues & UseModalValues;

export const PowerModal = forwardRef<PowerModalRef, PowerModalProps>(
	(props, ref) => {
		const {
			overlay,
			visible,
			wrapperOptions,
			containerOptions,
			contentOptions,
			children,
		} = props;

		const modalValues = useModal({ visible });
		const stylesValues = useModalStyles();

		useImperativeHandle(ref, () => ({
			...stylesValues,
			...modalValues,
		}));

		const BodyPortal: FC = useCallback(
			(props) => ReactDOM.createPortal(props.children, document.body),
			[]
		);

		return (
			<BodyPortal>
				<ModalWrapper
					modalValues={modalValues}
					wrapperOptions={wrapperOptions}
					stylesValues={stylesValues}>
					<ModalContainer
						containerOptions={containerOptions}
						stylesValues={stylesValues}>
						<ModalContent
							contentOptions={contentOptions}
							stylesValues={stylesValues}>
							<ModalBody stylesValues={stylesValues}>
								{children}
							</ModalBody>
						</ModalContent>
					</ModalContainer>
					<Overlay
						overlay={overlay}
						modalValues={modalValues}
						stylesValues={stylesValues}
					/>
				</ModalWrapper>
			</BodyPortal>
		);
	}
);
PowerModal.displayName = "PowerModal";
PowerModal.propTypes = {
	visible: PropTypes.bool,
	overlay: Overlay.propTypes?.overlay,
	wrapperOptions: ModalWrapper.propTypes?.wrapperOptions,
	containerOptions: ModalContainer.propTypes?.containerOptions,
	contentOptions: ModalContent.propTypes?.contentOptions,
	children: PropTypes.node,
};

export default PowerModal;
