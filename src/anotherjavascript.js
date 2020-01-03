console.log('there');

function secondButton(){
  var displayTime = "Current time: " + Date();
  document.getElementById("secondindex").innerHTML = displayTime;
}

window.secondButton = secondButton;