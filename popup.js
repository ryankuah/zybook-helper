import { getActiveTabURL } from "./utils.js";

const onClick = async e => {
    const activeTab = await getActiveTabURL();
  
    chrome.tabs.sendMessage(activeTab.id, {});
  };

document.getElementById('click').addEventListener('click', onClick);