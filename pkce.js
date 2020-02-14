let generateCodeVerifier = () => 
{
    let code_verifier = window.localStorage.getItem("code_verifier");
    if (!code_verifier)
    {
        code_verifier = generateRandomString(128);
        window.localStorage.setItem("code_verifier", code_verifier);
        window.localStorage.removeItem("code_challenge");
    }
    return code_verifier;

}


let generateCodeChallenge = (code_verifier) => 
{
    let code_challenge = window.localStorage.getItem("code_challenge");
    if (!code_challenge)
    {
        code_challenge = base64URL(CryptoJS.SHA256(code_verifier));
        window.localStorage.setItem("code_challenge", code_challenge);
    }
    return code_challenge;
}

let generateRandomString = (length) => 
{
    let text = window.localStorage.getItem("random_string");
    if(!text){
        text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    }
    return text;
}

let base64URL = (string) =>
{
    return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}