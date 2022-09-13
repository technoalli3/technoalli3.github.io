const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");


renderFields();
goBack();


async function renderFields() {
    let html;
    html = `
            <h3><span style="color:red">*</span> = required fields</h3>
            <label>Name:
                <input required type="text" id="name"><span style="color:red">*</span></input>
            </label>
            <br>
            <label>Avatar: 
                <input type="text" id="avatar"></input>
            </label>
            <br>
            <label>Colour: 
                <input type="text" id="colour"></input>
            </label>
            <br>
            <label>Pronouns: 
                <input type="text" id="pronouns"></input>
            </label>
            <br>
            <label>Description: 
                <input type="text" id="description"></input>
            </label>
            <br>
            <br>
            <button type="submit" onclick="newMember()">Submit</button>`

    document.getElementById("fields").innerHTML = html;

}

async function goBack() {
    let html = `<form action="member_setup.html">
                    <button type="submit" name="sys" value="${system}">Go back</button>
                </form>`
    document.getElementById("back").innerHTML = html;
}

async function newMember() {
    let html = `<div id="status-waiting"></div>`
    document.getElementById("status").innerHTML = html;

    if(document.getElementById("name").value == "") {
        html = `<div id="status-fail"></div>`
        document.getElementById("status").innerHTML = html;
        html = `<h2 id="error-message">Name field is required</h2>`
        document.getElementById("error-field").innerHTML = html;
        return;
    }

    let token = document.getElementById("token-field").value;

    if(token == "") {
        html = `<div id="status-fail"></div>`
        document.getElementById("status").innerHTML = html;
        html = `<h2 id="error-message">Token is required</h2>`
        document.getElementById("error-field").innerHTML = html;
        return;
    }


    let member = JSON.stringify({
        name: document.getElementById("name").value,
    })

    console.log(member);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://api.pluralkit.me/v2/members/', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", token);

    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status === 200) {
                html = `<div id="status-success"></div>`
                document.getElementById("status").innerHTML = html;
                
                console.log(xhr.response)
                let returnedMember = xhr.response;

            }
            if(xhr.status === 200) {
                html = `<div id="status-success"></div>`
                document.getElementById("status").innerHTML = html;
            }
        }
    }
    xhr.responseType = "json";
    xhr.send(member);

}