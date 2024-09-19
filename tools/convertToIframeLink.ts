export default function convertToIframeLink(url:string) {
    const videoIdMatch = url.split("/").pop();
    return "https://www.youtube.com/embed/" + videoIdMatch;
}