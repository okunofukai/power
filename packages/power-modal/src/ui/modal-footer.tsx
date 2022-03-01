import React, { FC } from "react";
import { UseModalStylesValues } from "../hooks/use-modal-styles";
import PropTypes from "prop-types";
import FooterButtons from "../components/FooterButton/footer-buttons";
import { UseModalValues } from "../hooks/use-modal";

export interface ModalFooterOptions {}

export interface ModalFooterProps {
	footer?: boolean | ModalFooterOptions;
	modalValues: UseModalValues;
	stylesValues: UseModalStylesValues;
}

export const ModalFooter: FC<ModalFooterProps> = (props) => {
	const { modalValues, stylesValues } = props;

	const { setShowModal } = modalValues;
	const { modalFooterStyles } = stylesValues;

	const defaultFooter = (
		<FooterButtons>
			<FooterButtons.Item onClick={() => setShowModal(false)}>
				Close
			</FooterButtons.Item>
		</FooterButtons>
	);

	return <div css={modalFooterStyles}>{defaultFooter}</div>;
};

ModalFooter.propTypes = {
	footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
};
