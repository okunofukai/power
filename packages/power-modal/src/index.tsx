import { CSSObject } from "@emotion/react";
import React, { FC, forwardRef, useCallback, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { usePowerModalStyles, UsePowerModalStylesValues } from "./styles";
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

export type PowerModalRef = UsePowerModalStylesValues;

export const PowerModal = forwardRef<PowerModalRef, PowerModalProps>(
	(props, ref) => {
		const { overlay, prefixCls, containerOptions, contentOptions } = props;

		const stylesValues = usePowerModalStyles();
		const { modalWrapperStyles } = stylesValues;

		useImperativeHandle(ref, () => ({
			...stylesValues,
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
						stylesValues={stylesValues}>
						<ModalContent
							contentOptions={contentOptions}
							stylesValues={stylesValues}>
							<ModalBody stylesValues={stylesValues}>
								Modal container works!
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
	prefixCls: PropTypes.string,
	containerOptions: ModalContainer.propTypes?.containerOptions,
};

export default PowerModal;
