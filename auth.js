var urlParams = new URLSearchParams(window.location.search);
var code = urlParams.get("code");
window.history.replaceState({}, document.title, "/");

var baseUrl = "https://YOUR_OKTA_DOMAIN.com";
var authorize_endpoint = `${baseUrl}/oauth2/v1/authorize`;  // this can be changed to include the Auth server id. Ex: `${baseUrl}/oauth2/AUTH_SERVER_ID/v1/authorize
var token_endpoint = `${baseUrl}/oauth2/v1/token`;          // this can be changed to include the Auth server id. Ex: `${baseUrl}/oauth2/AUTH_SERVER_ID/v1/token
var code_verifier = generateCodeVerifier()
var code_challenge = generateCodeChallenge(code_verifier)
var client_id = "YOUR_CLIENT_ID";
var redirect_uri = window.location.origin;
var scope = "openid";
var response_type = "code";
var response_mode = "query";  // DO NOT MODIFY. THE SCRIPT ONLY WORKS WITH QUERY PARAMETERS.
var state = generateRandomString(20);  // GENERATES A RANDOM STRING OF 20 CHARS LENGTH.  
var grant_type = "authorization_code";

if(code){
    
    var params = {
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "code": code,
        "grant_type": grant_type,
        "code_verifier": code_verifier
    }
    var data = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&'); 
    fetch(token_endpoint, {
        method: "POST",
        mode: "cors",
        body: data,
        headers: {"Content-Type":"application/x-www-form-urlencoded"}
    }).then(res=>{return res.json()}).then(res => console.log(res));
}else{
    window.location.replace(`${authorize_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}&response_mode=${response_mode}&state=${state}&code_challenge_method=s256&code_challenge=${code_challenge}`)
}