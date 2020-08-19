// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function getComments() {
  fetch('/data').then(response => response.json()).then((commentsArray) => {
    let container = document.getElementById('comments-container');
    container.innerText = '';
    console.log(commentsArray);
    for (const comment of commentsArray) {
        container.append(createCommentView(comment));
    }
  });
}

function initMap() {
  const prefPlace = { lat: 56, lng: 63 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: prefPlace,
    zoom: 12,
    mapTypeId: 'hybrid'
  });
  marker = new google.maps.Marker({position: prefPlace, map: map});
}

function loadAuthorizationView() {
  fetch('/authorization').then(response => response.text()).then(data => {
    view = document.getElementById('authorization_view')
    view.insertAdjacentHTML("afterbegin", data);
  });
}

function processCommentViewStatus() {
  fetch('/login_status').then(response => response.text()).then(status => {
    commentView = document.getElementById('comment-form')
    console.log("CommentView is: " + commentView)
    if (status === "true") {
      commentView.style.display = "block";
    } else {
      commentView.style.display = "none";
    }
  });
}

function doPreparation() {
  processCommentViewStatus();
  getComments();
  loadAuthorizationView();
}

function createCommentView(comment) {
  div = document.createElement("div");
  div.className = "comment-view";
  div.innerHTML = "<p class = \"email\"> " + comment.userEmail + "</p>\
          <p class = \"comment-message\">" +  comment.message + "</p>";
  return div;
}

function createListElement(comment) {
    const liElement = document.createElement("li");
    liElement.innerText = comment.userEmail + " | " + comment.message;
    return liElement;
}