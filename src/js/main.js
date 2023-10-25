import "../scss/styles.scss";
import * as bootstrap from "bootstrap";

import getUser from "./getUserDetails.js";

document.querySelectorAll("input").forEach((ele) => {
  ele.addEventListener("focus", function (e) {
    this.select();
    navigator.clipboard.writeText(this.value);
  });
});

// $('input').click(function () {
//     this.select();
// });

document
  .getElementById("getUserDetails")
  .addEventListener("click", function (e) {
    // console.log(e.target)
    hideStatus();
    getUser().then((user) => {
      console.log(user);
      document.querySelector("#status").classList.remove("invisible");
      if (user.data.results) {
        fillData(user.data.results[0]);
        updateStatus(true);
      } else {
        updateStatus(false);
      }
      showStatus();
    });
  });

function updateStatus(status) {
  const ele_status = document.querySelector("#status");
  ele_status.innerText = "";
  if (status) {
    ele_status.classList.contains("text-danger") &&
      ele_status.classList.remove("text-danger");
    ele_status.classList.contains("text-success") ||
      ele_status.classList.add("text-success");
    ele_status.innerText = "Data found and filled successfully !";
  } else if (!status) {
    ele_status.classList.contains("text-success") &&
      ele_status.classList.remove("text-success");
    ele_status.classList.contains("text-danger") ||
      ele_status.classList.add("text-danger");
    ele_status.innerText = "Oops ! data not found";
  }
}

function showStatus() {
  const ele_status = document.querySelector("#status");
  ele_status.classList.remove("invisible");
  ele_status.classList.add("visible");
}

function hideStatus() {
  const ele_status = document.querySelector("#status");
  ele_status.classList.remove("visible");
  ele_status.classList.add("invisible");
}

function fillData(u) {
  document.querySelector("#profilePicture").src = u.picture.large;
  document.querySelector(
    "#fullname"
  ).value = `${u.name.title} ${u.name.first} ${u.name.last}`;
  document.querySelector("#username").value = u.login.username;
  document.querySelector("#age").value = u.dob.age;
  document.querySelector(
    "#inputAddress"
  ).value = `${u.location.street.number} ${u.location.street.name}`;
  document.querySelector(
    "#inputAddress2"
  ).value = `${u.location.coordinates.latitude} ${u.location.coordinates.longitude}`;
  document.querySelector("#country").value = u.location.country;
  document.querySelector("#inputCity").value = `${u.location.city}`;
  document.querySelector("#stateDetails").value = `${u.location.state}`;
  document.querySelector("#inputZip").value = `${u.location.postcode}`;
}
