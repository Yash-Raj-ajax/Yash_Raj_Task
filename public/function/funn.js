var draggedItem = null;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedItem = event.target;
  event.dataTransfer.setData("text", event.target.innerHTML);
  event.target.classList.add("dragging");
  event.target.style.opacity = "0.5"; // Set opacity to 0.5 while dragging
  event.target.style.transform = "scale(0.8) rotate(-30deg)"; // Apply transformation while dragging
  event.target.style.transition = "transform 0.3s"; // Add transition effect

  var containerRect = document
    .querySelector(".drag-container")
    .getBoundingClientRect();
  var itemRect = event.target.getBoundingClientRect();

  var containerTop = containerRect.top;
  var containerBottom = containerRect.bottom;
  var itemTop = itemRect.top;
  var itemBottom = itemRect.bottom;

  if (itemTop < containerTop) {
    event.target.style.top = 0;
  } else if (itemBottom > containerBottom) {
    event.target.style.top = containerBottom - itemBottom + "px";
  } else {
    event.target.style.top = itemRect.top - containerRect.top + "px";
  }
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var item = document.createElement("div");
  item.innerHTML = data;
  item.style.opacity = "0.8"; // Set opacity to 0.8 after dropping
  item.style.transform = "none"; // Remove transformations after dropping
  item.style.transition = "opacity 0.3s"; // Add transition effect for opacity

  var dropContainer = event.target;
  if (!dropContainer.classList.contains("drop-container")) {
    dropContainer = dropContainer.closest(".drop-container");
  }

  dropContainer.appendChild(item);
  dropContainer.classList.add("success");
  item.classList.remove("dragging");
  showSuccessMessage();
}

function reset() {
  var dropContainer = document.querySelector(".drop-container");
  dropContainer.innerHTML = `<span class="message">Drop an item here</span>`;
  dropContainer.classList.remove("show-message");

  draggedItem = null;

  dropContainer.classList.remove("success");

  // Reset opacity and transformations for all items
  var items = document.querySelectorAll(".item");
  items.forEach(function (item) {
    item.style.opacity = "1";
    item.style.transform = "none";
    item.style.transition = "none";
    item.classList.remove("dragging");
    item.querySelector("i").style.animation = "none";
  });
}

function showSuccessMessage() {
  var dropContainer = document.querySelector(".drop-container");
  dropContainer.classList.add("show-message");
}
