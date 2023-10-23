const singUpForm = document.getElementById("SingUpForm");
const loginForm = document.getElementById("LoginForm");
const linkForm = document.getElementById("LinkForm");


function validateUserData(userData){

    document.getElementById("usernameValidation").innerText="";
    document.getElementById("passwordValidation").innerText="";

    const flag=true;

    if ((!userData.userName) || (userData.userName==" ") || (userData.userName=="") || (userData.userName.length<4)){
        document.getElementById("usernameValidation").innerText="Username no valid. Are needed more characteres";
        flag=false;
    }

    if ((!userData.password) || (userData.password==" ") || (userData.password=="") || (userData.password.length<4)){
        document.getElementById("passwordValidation").innerText="Password no valid. Are needed more characteres";
        flag=false;
    }

    return flag;
}

function validateLinkData(linkData){
    
    const flag=true;

    document.getElementById("linkValidation").innerText="";

    if ((!linkData.url) || (linkData.url==" ") || (linkData.url=="") || (linkData.url.length<8) || (!(linkData.url.includes("."))) ){
        document.getElementById("linkValidation").innerText="Link no valid. Is needed the correct format";
        flag=false;
    }

    return flag;
}

function buildingRow(){
    const tableLinksData =  document.getElementById("tableLinksData");
    let row = document.createElement('tr');
    let titleData = document.createElement('td');
    let totalData = document.createElement('td');
    titleData.innerText="page processing";
    totalData.innerText="in progress";
    tableLinksData.appendChild(row);
    row.appendChild(titleData);
    row.appendChild(totalData);
}

function setRow(data){
    const tableLinksData = document.getElementById('tableLinksData');
    const lastRow = tableLinksData.rows[tableLinksData.rows.length - 1];
    const linkElement = document.createElement('a');
    lastRow.cells[0].innerText="";
    linkElement.href = data.link.data.url; 
    linkElement.innerText = data.link.data.url; 
    lastRow.cells[0].appendChild(linkElement);
    lastRow.cells[1].innerText = data.linksRelatedTotal;
}

async function consumeAPI(url, method, bodyData){
    try {
        const response = await fetch(url, {
          method: method,
          headers: {
            Authorization: 'Bearer TTxxddse40301dwer13467e1ll@ew',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        const data = await response.json();
        console.log('Data received:', data);
        return data;
         
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

if (singUpForm) {
    singUpForm.addEventListener("submit", async function(event){
        event.preventDefault();    

        const bodyData = {
            userName: document.getElementById("username").value,
            password: document.getElementById("password").value
        }

        if (!validateUserData(bodyData)){
            return;
        }

        const data = await consumeAPI("api/v1/users","POST",bodyData);

        if ((data && (data.code==200))){
            Swal.fire("Sign up correct");
            setTimeout(function() {window.location.href = '/';}, 1000);
        }
        else if ((data && (data.code==409))){
            Swal.fire("User name already sing up. Try with another one");
        }
        else{
            Swal.fire("There was an error in the process. Try again later");
        }
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", async function(event){
        
        event.preventDefault();

        const bodyData = {
            userName: document.getElementById("username").value,
            password: document.getElementById("password").value
        }

        if (!validateUserData(bodyData)){
            return;
        }

        const data = await consumeAPI("api/v1/users/login","POST", bodyData);

        if ((data && (data.code==200))){
            window.location.replace('/home');
        }
        else if ((data && (data.code!=200))){
            Swal.fire("User or password incorrect");
        }
        else{
            Swal.fire("There was an error in the process. Try again later");
        }
    });
}

if (linkForm) {
    linkForm.addEventListener("submit", async function(event){
       
        event.preventDefault();

        const bodyData = {
            url: document.getElementById("link").value,
        }

        if (!validateLinkData(bodyData)){
            return;
        }

        buildingRow();

        const data = await consumeAPI("api/v1/links","POST", bodyData);
        if ((data && (data.link.code==200))){
            Swal.fire("link stored");
            setRow(data);
        }
        else{
            Swal.fire("There was an error in the process. Try again later");
        }
    });
}
