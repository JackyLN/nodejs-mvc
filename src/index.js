import './anotherjavascript';
import './mystyle.css';

console.log('here');

function myFunction() {
  var displayTime = "Current time: " + Date();
  document.getElementById("myindex").innerHTML = displayTime;
}

window.myFunction = myFunction;