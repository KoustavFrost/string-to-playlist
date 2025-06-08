# String to Spotify Playlist

Hello 👋🏼, Just Another Average Programmer here. I had this fun idea one day, what if i can convert any sentence to a spotify playlist? And here is my response. This stupid application.

<br />

This application can convert any string to a spotify playlist (sort of).

<br />

Want to try? here are the steps to do:

### Spotify Developer:
- Head over to [Spotify Developer](https://developer.spotify.com/) and login/sign up.
- In the dashboard, create an app.
- In the application page, make sure to enter the Redirect URI and check Web API. You can follow this [guide](https://developer.spotify.com/documentation/web-api/concepts/apps). 
- The redirect url should be `http://127.0.0.1:3000/api/callback` if running on local system. If hosted, then just change the domain in the above URL.
- After the app is created, get hold of client id and secret.
- That's it on the Spotify side.

### Application:
- Make sure you have NodeJs up on your system. I used version `20.15.1`.
- Clone the application. 
- cd into the application.
- Create a `.env` file using the command below: 
```
cp .env.example .env
```
- In the newly created `.env` file, paste the client id and secret. 
- Also make sure that the callback url matches with the Dashboard.
- Run this command to install the packages:
```
npm install
```
- Run this command to run the application on the local host:
```
npm run dev
```

## Developers Note:
Hello 👋🏼 once again. This application does not contain any sort of validations and checks. I have developed it crudly and need a lot of work to make it production ready. <br />
Thanks 😄