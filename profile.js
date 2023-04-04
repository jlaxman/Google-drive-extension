import utils from "./utils.js";

let params = utils.getParamsFromURL(location.href);
let ACCESS_TOKEN = "";
let redirect_url = "http://localhost:8000//index.html";
let button = document.getElementById("logout");
let fileImage = document.getElementById("files");
let search = document.getElementById("search");
let images = document.getElementById("images");
let videos = document.getElementById("videos");
let pdf = document.getElementById("pdf");
let result = document.getElementById("result");
let users = document.getElementById("userList");

console.log(params);

utils.saveOAuth2Info(params, "profile.html", "info");

let info = JSON.parse(localStorage.getItem("info"));
ACCESS_TOKEN = info.access_token;
form.onsubmit = uploadFile;

function uploadFile(e) {
  e.preventDefault();
  var file = document.getElementById("file");

  console.log(file.files[0]);

  var metadata = {
    name: file.files[0].name, // Filename at Google Drive
    mimeType: file.files[0].type, // mimeType at Google Drive
    //parents: ["##googldrivefolderid##"], // Folder ID at Google Drive
  };

  var form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("userpic", file.files[0]);

  fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + ACCESS_TOKEN }),
      body: form,
    }
  )
    .then((res) => {
      return res.json();
    })
    .then(function (val) {
      console.log(val);
      file.value = "";
      alert("file Uploaded");
    });
}

button.onclick = logout;

function logout() {
  utils.logout(ACCESS_TOKEN, redirect_url);
}

search.onclick = listFiles;
images.onclick = getImages;
videos.onclick = getVideos;
pdf.onclick = getPDF;

function listFiles() {
  searchFiles();
}
function getImages() {
  searchFiles("mimeType contains 'image/'");
}
function getVideos() {
  searchFiles("mimeType contains 'video/'");
}
function getPDF() {
  searchFiles("mimeType contains 'application/pdf'");
}

function searchFiles(q = "") {
  result.innerHTML = "";
  fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&pageSize=10&supportsAllDrives=true&fields=files(name,id,mimeType,webContentLink)`,
    {
      method: "GET",
      headers: new Headers({ Authorization: "Bearer " + ACCESS_TOKEN }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then(function (val) {
      console.log(val);
      val.files.forEach((file) => {
        let id = file.id;
        result.innerHTML += `
            <tr class='permissions-row'>
                <td><a target="_blank" href="https://drive.google.com/file/d/${file.id}">${file.name}</a>
                </td>
                <td>${file.mimeType}</td>
                <td>
                    <a target="_blank" href="${file.webContentLink}">Download ${file.name}</a>
                </td>
                <td>
                <button onclick="
                fetch('https://www.googleapis.com/drive/v3/files/${id}',{
                    method:'DELETE',
                    headers:new Headers({Authorization:'Bearer ${ACCESS_TOKEN}'})
                })
                .then((info) => {
                    console.log(info)
                    alert('file is deleted')
                })
                ">Delete ${file.name}</button>
                </td>
                <td>
                <button onclick="
                fetch('https://www.googleapis.com/drive/v3/files/${file.id}/permissions?supportsAllDrives=true&fields=*',{
                    headers:new Headers({Authorization:'Bearer ${ACCESS_TOKEN}'})
                })
                .then(response => response.json())
  .then(data => {
        const permissions = data.permissions.filter(permission => permission.type === 'user');
        console.log('${file.id}');
        const emails = permissions.map(permission => permission.emailAddress).join(', ');
        const emailAddressColumn = document.getElementById('${file.id}');
        console.log(emailAddressColumn);
        emailAddressColumn.innerHTML = emails;

  }).catch(error => {
    console.error('Error:', error);
  })
                ">Fetch Users</button>
                </td>
                <td id=${file.id}></td>
            </tr>
            `;
      });
    });
}
