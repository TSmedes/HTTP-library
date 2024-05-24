let http = new HTTPRequest();

window.onload = function() {
    StartUp();
}

function StartUp() {
    document.querySelector("#get").checked = true;
    SetupInput("get");

    document.getElementById("send").addEventListener("click", newRequest());
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
    switch (method) {
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
    if (method === "GET") {
        document.querySelector("#body-field").value = "";
        document.querySelector("#title").value = "";
        okToSend = (ValidId(document.querySelector("#user-id").value));
    }

    if (method === "POST") {
        document.querySelector("#user-id").value = "";
        title = document.querySelector("#title").value;
        body = document.querySelector("#body-field").value;
        okToSend = true;
    }

    if (method === "PUT") {
        okToSend = false;
        if (ValidId(document.querySelector("#user-id").value,true)) {
           title = document.querySelector("#title").value;
           body = document.querySelector("#body-field").value;
          okToSend = true;
        }
    }
    if (method === "DELETE") {
        document.querySelector("#body-field").value = "";
        document.querySelector("#title").value = "";
        okToSend = (ValidId(document.querySelector("#user-id").value,true));
    };
    if (method === "PATCH") {
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
        sendRequest(method,route,document.querySelector("#user-id").value , title, body);
        document.querySelector("#user-id").value = "";
        document.querySelector("#title").value = "";
        document.querySelector("#body-field").value = "";
    } else {
        console.log("Input Error");
    }
}

async function sendRequest(method, targetURL, id, title, body) {

    let resp;
    switch (method) {
      case "GET": // Get users from the endpoint
        resp = await http.get(targetURL, id);
        break;
      case "POST": // Post (add) user to the endpoint
        resp = await http.post(targetURL, title, body);
        break;
      case "PUT": // Put (update) user in the endpoint
        resp = await http.put(targetURL, id, title, body);
        break;
      case "DELETE": // Delete user in the placeholder website
        resp = await http.delete(targetURL, id);
        break;
      case "PATCH": // Delete user in the placeholder website
        resp = await http.delete(targetURL, id, title, body);
        break;
    }
    ShowResponse(resp);
    
}

function ShowResponse(responseData) {
    let html = "<ul style='list-style:none'>";
   
  console.log(responseData);
    if (typeof responseData === "string") {
      html += `<li>${responseData}</li>`;
    } else if (Array.isArray(responseData)) {
      responseData.forEach(user => {
        html += `<li>Title: ${user.title}</li> <li>Body: ${user.body}</li>`;
      })
    } else {
      html += `<li>Title: ${responseData.title}</li> <li>Body: ${responseData.body}</li>`;
    }
    document.querySelector("#response").innerHTML = html;
}