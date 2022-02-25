import { CSSObject } from "@emotion/react";
import React, {
	Dispatch,
	FC,
	forwardRef,
	SetStateAction,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const usePowerModalStyles = () => {
	const [modalWrapperStyles, setModalWrapperStyles] = useState<CSSObject>({
		position: "fixed",
		height: "100vh",
		width: "100vw",
		top: "0",
		left: "0",
	});

	const [overlayStyles, setOverlayStyles] = useState<CSSObject>({
		zIndex: -1,
		position: "absolute",
		top: "0",
		left: "0",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.45)",
	});

	const [modalContainerStyles, setModalContainerStyles] = useState<CSSObject>(
		{
			color: "yellow",
		}
	);

	return {
		overlayStyles,
		setOverlayStyles,
		modalWrapperStyles,
		setModalWrapperStyles,
		modalContainerStyles,
		setModalContainerStyles,
	};
};

export interface PowerModalProps {
	showOverlay?: boolean;
	prefixCls?: string;
}

export interface PowerModalRef {
	setOverlayStyles: Dispatch<SetStateAction<CSSObject>>;
	setModalWrapperStyles: Dispatch<SetStateAction<CSSObject>>;
	setModalContainerStyles: Dispatch<SetStateAction<CSSObject>>;
}

export const PowerModal = forwardRef<PowerModalRef, PowerModalProps>(
	(props, ref) => {
		const { showOverlay, prefixCls } = props;

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

		return (
			<BodyPortal>
				<div css={modalWrapperStyles} className={prefixCls}>
					<div css={modalContainerStyles}>TEST</div>
					{showOverlay && <div css={overlayStyles} />}
				</div>
			</BodyPortal>
		);
	}
);
PowerModal.displayName = "PowerModal";
PowerModal.propTypes = {
	showOverlay: PropTypes.bool,
	prefixCls: PropTypes.string,
};

export default PowerModal;
