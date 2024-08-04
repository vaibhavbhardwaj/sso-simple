
const allowedOrigin = {
    "http://localhost:3020": true,
    "http://localhost:3010": true,
    "http://localhost:3080": false
};

const originAppName = {
    "http://localhost:3020": "consumer",
    "http://localhost:3010": "provider"
};

userDataDB = {
    'vaibhav@google.com':{
        password: 'test@123',
        userId: '12345'
    },
    appPolicy:{
        
    }
}

const sessionUser = {}
var sessionApp = {}
const validationTokenCache = {}

const setSessionApp=(origin,id,validationToken)=>{
    console.log(origin,id,validationToken)
    if(sessionApp[id] == null){
        sessionApp[id]={ [originAppName[origin]]: true}
        validationTokenCache[validationToken] = [id,originAppName[origin]]
    }else{
        sessionApp[id][originAppName[origin]] = true,
        validationTokenCache[validationToken] = [id,originAppName[origin]]

    }
    console.log(sessionApp,validationTokenCache)
    //console.log(...sessionApp,...validationTokenCache)
} 

const login=(req,res,next)=>{
    console.log("login",req.session)
    const {serviceUrl}=req.query
    if(serviceUrl !== null){
        const url = new URL(serviceUrl);
        if(allowedOrigin[url.origin] !== true){
            res.status(400).json("consumer is not allowed")
            return
        }
    }
    if (req.session.user != null && serviceUrl == null) {
        return res.redirect("/");
    }
    return res.render("login", {
        title: "SSO-Server | Login"
      });

   





    res.json("login")
}

const postLogin = (req,res)=>{
    console.log("postlogin")
    const { email, password } = req.body;
    if (!(userDataDB[email] && password === userDataDB[email].password)) {
        return res.status(404).json({ message: "Invalid email and password" });
    }
    const { serviceUrl } = req.query;
    if (serviceUrl == null) {
        return res.redirect("/");
    }
    
    const url = new URL(serviceUrl); //check for url
    if(allowedOrigin[url.origin] !== true){
        res.status(400).json("consumer is not registered for sso or unknown application")
        return
    }
    console.log()
    const id = userDataDB[email].userId 
    console.log("id")
    req.session.user = id;
    sessionUser[id] = email;
    const validationToken = id
    setSessionApp(url.origin,id,validationToken)
    const redirectUrl = `${serviceUrl}?ssoToken=${validationToken}`
    console.log(redirectUrl)
    return res.redirect(redirectUrl);

    

    


   



    
    res.json("postlogin")
}

const verifyToken = (req,res)=>{
    console.log('verify token')
    res.json("postloverifytokengin")
}

module.exports = Object.assign({}, { postLogin, login, verifyToken });