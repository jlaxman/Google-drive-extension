# Google-drive-extension

<h3> Setup your Environment </h3>
  
Prerequisites
You need the following prerequisites:


1) <a href='https://developers.google.com/workspace/guides/create-project'> A Google Cloud project </a>
2) A Google account with Google Drive enabled

<p>
<a href='https://console.cloud.google.com/flows/enableapi?apiid=drive.googleapis.com' >Enable the API  </a> <br>
<h4>Before using Google APIs, you need to turn them on in a Google Cloud project. You can turn on one or more APIs in a single Google Cloud project.
In the Google Cloud console, enable the Google Drive API. </h4> </p>


<h2> Authorize credentials for a Web application</h2>
<p> To authenticate as an end user and access user data in your app, you need to create a OAuth 2.0 Client ID.
In the Google Cloud console, go to Menu menu > APIs & Services > Credentials.
Go to Credentials

1) Click Create Credentials > OAuth client ID. <br>
2) Click Application type > Web application.  <br>
3) In the Name field, type a name for the credential.  <br>
4) In Authorized JavaScript origins add this: http://localhost:8000  <br>
5) In Authorized redirect URLs: add this: http://localhost:8000/profile.html  <br>
6) Click Create. The OAuth client created screen appears, showing your new Client ID. </p>
  
Copy this Client ID to Client ID field present in script.js file.
  

<h3> How to run <h3>

In Terminal

1) To clone: Enter this cmd on terminal: git clone [https://gitfront.io/r/user-6044564/Vxcr3gCQYXQQ/Google-drive-extension.git](https://gitfront.io/r/user-6044564/Vxcr3gCQYXQQ/Google-drive-extension/)
2) Change directory to Google-drive-extension: Enter this cmd on terminal: cd Google-drive-extension
3)  After above step run this cmd on terminal: python -m http.server 8000
4) Open this http://localhost:8000 in your browser, to see application running
 
 
  
 
