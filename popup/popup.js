document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value.trim();
    if (query) {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
				query
			)}`;
      chrome.tabs.create({ url: url });
    }
  });
  