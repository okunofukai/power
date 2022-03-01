import React, { FC, ReactNode } from "react";
import { UseModalStylesValues } from "../hooks/use-modal-styles";
import PropTypes from "prop-types";
import FooterButtons from "../components/FooterButton/footer-buttons";
import { UseModalValues } from "../hooks/use-modal";

export interface ModalFooterProps {
	footer?: boolean | ReactNode;
	modalValues: UseModalValues;
	stylesValues: UseModalStylesValues;
}

export const ModalFooter: FC<ModalFooterProps> = (props) => {
	const { modalValues, stylesValues, footer = true } = props;

	const { setShowModal } = modalValues;
	const { modalFooterStyles } = stylesValues;

	const defaultFooter = (
		<FooterButtons>
			<FooterButtons.Item onClick={() => setShowModal(false)}>
				Close
			</FooterButtons.Item>
		</FooterButtons>
	);

	const footerContent =
		typeof footer === "object" ? footer : footer ? defaultFooter : null;

	return <div css={modalFooterStyles}>{footerContent}</div>;
};

ModalFooter.propTypes = {
	footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
};
