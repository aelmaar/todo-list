import React, { useEffect } from "react";

function Modal({ color, modalContent, closeModal }) {
	useEffect(() => {
		setTimeout(() => {
			closeModal();
		}, 2000);
	});

	return (
		<div className="modal">
			<p style={{ color: color ? "rgba(0,92,0,1)" : "rgba(255,0,0,.7)" }}>
				{modalContent}
			</p>
		</div>
	);
}

export default Modal;
