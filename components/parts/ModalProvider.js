import React, { createContext, useContext, useState } from "react";

// Note: Default value is never used
const modalContext = createContext({
	toggle: () => {},
	showMessage: () => {},
	show: false,
	message: "No Message"
});

export function ModalProvider({ children }) {
	const [modalData, setModalData] = useState({
		show: false,
		message: "No Message"
	});

	const updateModal = newData => {
		setModalData({
			...modalData,
			...newData
		});
	};

	const toggle = show => {
		if(typeof show !== "boolean") {
			show = !modalData.show;
		}
		if(show === modalData.show) {
			return;
		}

		const newData = {
			show: show
		};

		if(!show) {
			newData.message = "";
		}

		updateModal(newData);
	};

	const showMessage = message => {
		updateModal({
			show: true,
			message: message
		});
	};

	const contextValue = {
		...modalData,
		toggle: toggle,
		showMessage: showMessage
	};

	return (
		<modalContext.Provider value={contextValue}>
			{children}
		</modalContext.Provider>
	);
}

export default function useModal() {
	return useContext(modalContext);
}