// Note: the LIVE_2D_PATH parameter should use absolute path
// const LIVE_2D_PATH = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/";
// change this path to Michael's path
const LIVE_2D_PATH =  "https://michael18811380328.github.io/resource/waifu/";
const API_PAH = "https://live2d.fghrsh.net/api/";
const CDN_PATH = "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/";

/**
 * Load external resources asynchronously
 * @param {resource url} url 
 * @param {file type} type 
 * @returns null
 */
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;
		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// In desktop, load resource and init live_2d (看板娘)
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource(LIVE_2D_PATH + "waifu.css", "css"),
		loadExternalResource(LIVE_2D_PATH + "live2d.min.js", "js"),
		loadExternalResource(LIVE_2D_PATH + "waifu-tips.js", "js")
	]).then(() => {
		// note: in recent waifu-tips, initWidget parameters is changed to 
		// initWidget(config, apiPath)
		initWidget({
			waifuPath: LIVE_2D_PATH + "waifu-tips.json",
			//apiPath: API_PAH,
			cdnPath: CDN_PATH,
		});
	});
}
