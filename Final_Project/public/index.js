
function getForumIdFromURL() {
  var path = window.location.pathname;
  var pathParts = path.split('/');
  if (pathParts[1] === "forum") {
    return pathParts[2];
  } else {
    return null;
  }
}

function postButtonClick() {

  var postContent = document.getElementById('text-input').value.trim();

  if (!postContent) {
    alert("You can't make an empty post!");
  } else {

    var postRequest = new XMLHttpRequest();
    var requestURL = '/forum/' + getForumIdFromURL()  + '/makePost';
    postRequest.open('POST', requestURL);

    var requestBody = JSON.stringify({
      content: postContent,
    });

    postRequest.addEventListener('load', function(event) {
      var dateAndTime = new Date().toLocaleString();
      if (event.target.status === 200) {
        var postCardTemplate = Handlebars.templates.newPostHandler;
        var newPostCardHTML = postCardTemplate({
          times: dateAndTime,
          content: content
        });
        var postCardContainer= document.querySelector("prior-posts-container");
        postCardContainer.insertAdjacentHTML("beforeend", newPostCardHTML);
    } else {
        alert("Error storing photo: " + event.target.response);
      }
    });
postRequest.setRequestHeader('Content-Type', 'application/json');
postRequest.send(requestBody);
reloadPage();
}
}

function reloadPage() {
  console.log("is this function hit ?")
    location.reload();
}



var postButton = document.getElementById('post-button');
if (postButton) {
  postButton.addEventListener('click', postButtonClick);
}
