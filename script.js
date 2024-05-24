let http = new HTTPRequest();

window.onload = function() {
    StartUp();
}

function StartUp() {
    document.querySelector("#get").checked = true;
    SetupInput("get");

    document.getElementById("submit").addEventListener("click", newRequest());
    //Radio button listeners
    document.querySelector("#get").addEventListener("change", () => SetupInput("get"));
    document.querySelector("#put").addEventListener("change", () => SetupInput("post"));
    document.querySelector("#post").addEventListener("change", () => SetupInput("put"));
    document.querySelector("#delete").addEventListener("change", () => SetupInput("delete"));
    document.querySelector("#patch").addEventListener("change", () => SetupInput("patch"));

    document.querySelector("#send").addEventListener("click", (e) => {
        newRequest();
        e.preventDefault();
      });
}
function SetupInput(method) {
    switch (reqType) {
        case "get":
          document.querySelector("#user-id").style.display = "flex";
          document.querySelector("#body-field").style.display = "none";
          document.querySelector("#title").style.display = "none";
          break;
        case "post":
          document.querySelector("#user-id").style.display = "none";
          document.querySelector("#body-field").style.display = "flex";
          document.querySelector("#title").style.display = "flex";
          break;
        case "put":
          document.querySelector("#user-id").style.display = "flex";
          document.querySelector("#body-field").style.display = "flex";
          document.querySelector("#title").style.display = "flex";
          break;
        case "delete":
          document.querySelector("#user-id").style.display = "flex";
          document.querySelector("#body-field").style.display = "none";
          document.querySelector("#title").style.display = "none";
          break;
        case "patch":
          document.querySelector("#user-id").style.display = "flex";
          document.querySelector("#body-field").style.display = "flex";
          document.querySelector("#title").style.display = "flex";
          break;
    }
}
function ValidId(id, required = false) {
    let isValid;
  
    if (id.length > 0) {
      isValid = (Number.isInteger(Number(id)))
      if (isValid) {
        isValid = ((Number(id) > 1 && Number(id) < 11));
      }
    } else if (required) {
      isValid = false;
    } else {
      isValid = true;
    }
  
    if (!isValid) {
      document.querySelector("#user-id").style.border = "2px solid red";
      document.querySelector("#user-id").value = "err";
    }
    
    return isValid;
}
function newRequest() {
    let route = document.querySelector('#url-field').value;
    const radioButtons = document.querySelectorAll("input[name='method'");
    let method;
    let title;
    let body;

    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
        method = radioButton.value;
        break;
        }
    }

    let okToSend;
    if (method === "get") {
        document.querySelector("#body-field").value = "";
        document.querySelector("#title-field").value = "";
        okToSend = (ValidId(document.querySelector("#user-id").value));
    }

    if (method === "post") {
        document.querySelector("#user-id").value = "";
        title = document.querySelector("#title").value;
        body = document.querySelector("#body-field").value;
        okToSend = true;
    }

    if (method === "put") {
        okToSend = false;
        if (ValidId(document.querySelector("#user-id").value,true)) {
           title = document.querySelector("#title").value;
           body = document.querySelector("#body-field").value;
          okToSend = true;
        }
    }
    if (method === "delete") {
        document.querySelector("#body-field").value = "";
        document.querySelector("#title-field").value = "";
        okToSend = (ValidId(document.querySelector("#user-id").value,true));
    };
    if (method === "patch") {
        if (ValidId(document.querySelector("#user-id").value,true)) {
             title = document.querySelector("#title").value;
             body = document.querySelector("#body-field").value;
            okToSend = true;
        }
    };

    if (okToSend) {
        document.querySelector("#user-id").style.border = "1px solid lightgrey";
        document.querySelector("#title").style.border = "1px solid lightgrey";
        document.querySelector("#body-field").style.border = "1px solid lightgrey";
        sendRequest(method,route,document.querySelector("#body-field").value , title, body);
        document.querySelector("#user-id").value = "";
        document.querySelector("#title").value = "";
        document.querySelector("#body-field").value = "";
    } else {
        console.log("Input Error");
    }
}

function sendRequest(reqType, targetURL, id, title, body) {
    let resp = document.querySelector('#response').innerHTML;
    switch (reqType) {
      case "get": // Get users from the endpoint
        resp = http.get(targetURL, id);
        break;
      case "post": // Post (add) user to the endpoint
        resp = http.post(targetURL, title, body);
        break;
      case "put": // Put (update) user in the endpoint
        resp = http.put(targetURL, id, title, body);
        break;
      case "delete": // Delete user in the placeholder website
        resp = http.delete(targetURL, id);
        break;
      case "patch": // Delete user in the placeholder website
        resp = http.delete(targetURL, id, title, body);
        break;
    }
    
}