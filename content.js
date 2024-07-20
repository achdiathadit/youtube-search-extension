document.addEventListener("selectionchange", () => {
	const selectedText = window.getSelection().toString().trim();
	if (selectedText) {
		chrome.runtime.sendMessage({
			action: "updateContextMenu",
			selectionText: selectedText,
		});
	}
});
