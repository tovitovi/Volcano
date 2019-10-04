// JavaScript Document

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("modal_image");
var modalVideo = document.getElementById("modal_video")
var captionText = document.getElementById("caption");
function displayModal(var1){
  modal.style.display = "block";
  modalImg.src = var1.src;
  captionText.innerHTML = var1.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  modalVideo.pause();
}


function displayVideo(var1){
	modal.style.display = "block"
	modalVideo.src = var1.src
}


window.addEventListener('load', onVrViewLoad);

function onVrViewLoad() {
  // Selector '#vrview' finds element with id 'vrview'.
  var vrView = new VRView.Player('#vrview', {
    video: "/videos/congo.mp4",
    is_stereo: true
  });
}