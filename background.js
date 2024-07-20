const API_KEY = "YOUR_YOUTUBE_API_KEY";

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		title: "Search on YouTube",
		id: "contextMenu1",
		contexts: ["selection"],
	});

	chrome.contextMenus.onClicked.addListener((info, tab) => {
		if (info.menuItemId === "contextMenu1" && info.selectionText) {
			let query = info.selectionText.trim();
			searchYouTube(query)
				.then((data) => {
					chrome.storage.local.set({
						videos: data.items,
					});
					let url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
						query
					)}`;
					chrome.tabs.create({ url: url });
				})
				.catch((error) => console.error("Error fetching YouTube data:", error));
		}
	});
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "updateContextMenu" && message.selectionText) {
		chrome.contextMenus.update("contextMenu1", {
			title: `Search "${message.selectionText}" on YouTube`,
		});
	}
});

function searchYouTube(query) {
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
		query
	)}&key=${API_KEY}`;
	return fetch(url)
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => {
			console.error("Error:", error);
			return [];
		});
}
