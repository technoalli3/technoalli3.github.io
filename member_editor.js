const queryString = window.location.search;
const member = new URLSearchParams(queryString).get("members");

//order of operations

renderName();
renderFields();


async function getMember() {
    let response = await fetch("https://api.pluralkit.me/v2/members/" + member);
    if (response.status != 200) {
        return null
    }
    return await response.json()
}

async function renderName() {
    const memberObject = await getMember();
    document.getElementById("name").innerHTML = memberObject.name;
}

async function renderFields() {
    const memberObject = await getMember();
    let html = `<form>
                    <label>Name:</label>
                    <input id="i1" type="text" name="name" value="${memberObject.name}">
                    <br>
                    <label>Birthday:</label>
                    <input id="i2" type="text" name="birthday" value="${memberObject.birthday}">
                    <br>
                    <label>Colour:</label>
                    <input id="i3" type="text" name="color" value="${memberObject.color}">
                    <br>
                    <label>Pronouns:</label>
                    <input id="i4" type="text" name="pronouns" value="${memberObject.pronouns}">
                    <br>
                    <label>Banner:</label>
                    <input id="i5" type="text" name="banner" value="${memberObject.banner_url}">
                    <button>Upload</button>
                    <br>
                    <label>Description:</label>
                    <input id="i6" id="description" type="text" name="description" value="${memberObject.description}">
                    <br>
                    <label>Proxy Tags:</label>
                    <input id="i7" id="proxy" type="text" name="description" value="${memberObject.proxy_tags}">
                    <br>
                    <br>
                    <label>Please enter your PK token:</label>
                    <input id="token" type="text" name="token">                            
                </form>
                <button onclick="buildObject()">Submit</button>`

    document.getElementById("fields").innerHTML = html;
}

async function buildObject() {
    const memberObject = await getMember();

    let name = document.getElementById("i1").value;
    let birthday = document.getElementById("i2").value;
    let colour = document.getElementById("i3").value;
    let pronouns = document.getElementById("i4").value;
    let banner = document.getElementById("i5").value;
    let description = document.getElementById("i6").value;
    let proxy_tags = document.getElementById("i7").value;
    let token = document.getElementById("token").value;

    memberObject.name = name;
    if(birthday != "null") {
        memberObject.birthday = birthday;
    }
    if(colour != "null") {
        memberObject.color = colour;
    }
    if(pronouns != "null") {
        memberObject.pronouns = pronouns;
    }
    memberObject.banner_url = banner;
    memberObject.description = description;

    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", 'https://api.pluralkit.me/v2/members/' + memberObject.id, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", token);

    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Request finished. Do processing here.
        }
    }
    xhr.send(JSON.stringify(memberObject));
    
    
}