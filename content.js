const potatoes = [
  "https://cdn.hackclub.com/019ca4c1-a681-789c-b893-0de2728026be/image.png",
  "https://cdn.hackclub.com/019ca4b1-32ca-7616-b84d-fed6638fcbb3/image.png",
  "https://thumbs.dreamstime.com/b/sliced-potato-wooden-cutting-board-36893893.jpg"
];

function getRandomPotato() {
  return potatoes[Math.floor(Math.random() * potatoes.length)];
}

function replaceImage(img) {
  if (img.dataset.potatoDone) return;

  img.dataset.potatoDone = "true";
  img.src = getRandomPotato();
  img.srcset = "";
}

const viewportObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      replaceImage(entry.target);
    }
  });
}, { rootMargin: "200px" }); // start a bit before it enters view

function observeImages(node = document) {
  node.querySelectorAll("img").forEach(img => {
    viewportObserver.observe(img);
  });
}

// initial images
observeImages();

// watch for new images added to page
const domObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType === 1) observeImages(node);
    });
  });
});

domObserver.observe(document.body, { childList: true, subtree: true });