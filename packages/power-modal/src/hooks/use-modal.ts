import { useCallback, useEffect, useState } from "react";

export interface UseModalValues {
	showModal: boolean;
	setShowModal: (
		newValue: boolean | ((prevValue: boolean) => boolean)
	) => void;
	toggleModalVisibility: () => void;
}

export interface UseModalProps {
	visible?: boolean;
}

export const useModal = (props: UseModalProps) => {
	const { visible } = props;

	const [showModal, _setShowModal] = useState<boolean>(!!visible);

	useEffect(() => setShowModal(!!visible), [visible]);

	const setShowModal = useCallback(
		(newValue: boolean | ((prevValue: boolean) => boolean)) =>
			_setShowModal(newValue),
		[_setShowModal]
	);
	const toggleModalVisibility = useCallback(
		() => setShowModal((prevValue) => !prevValue),
		[setShowModal]
	);

	return {
		showModal,
		setShowModal,
		toggleModalVisibility,
	} as UseModalValues;
};
