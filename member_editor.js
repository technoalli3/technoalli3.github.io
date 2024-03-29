const queryString = window.location.search;
const member = new URLSearchParams(queryString).get("members");
const system = new URLSearchParams(queryString).get("sys");

//order of operations

renderTitle();
renderFields();


async function getMember() {
    let response = await fetch("https://api.pluralkit.me/v2/members/" + member);
    if (response.status != 200) {
        return null
    }
    return await response.json()
}

async function renderTitle() {
    const memberObject = await getMember();
    document.getElementById("name").innerHTML = memberObject.name;
    let html = `<form action="member_setup.html">
                    <button type="submit" name="sys" value="${system}">Go Back</button>
                </form>`
    document.getElementById("back").innerHTML = html;
}

async function renderFields() {
    const memberObject = await getMember();

    let birthday = "";
    if(memberObject.birthday != null) {
        birthday = memberObject.birthday;
    }
    let colour = "";
    if(memberObject.color != null) {
        colour = memberObject.color;
    }
    let pronouns = "";
    if(memberObject.pronouns != null) {
        pronouns = memberObject.pronouns;
    }
    let banner = "";
    if(memberObject.banner_url != null) {
        banner = memberObject.banner_url;
    }
    let description = "";
    if(memberObject.description != null) {
        description = memberObject.description;
    }
    let avatar = "";
    if(memberObject.avatar_url != null) {
        avatar = memberObject.avatar_url;
    }


    let html = `<div id="input-grid">
                    <div>
                        <form>
                            <label>Name:</label>
                            <input id="i1" type="text" name="name" value="${memberObject.name}">
                            <br>
                            <label>Birthday:</label>
                            <input id="i2" type="text" name="birthday" value="${birthday}">
                            <br>
                            <label>Colour:</label>
                            <input id="i3" type="text" name="color" value="${colour}">
                            <br>
                            <label>Pronouns:</label>
                            <input id="i4" type="text" name="pronouns" value="${pronouns}">
                            <br>
                            <label>Banner:</label>
                            <input id="i5" type="text" name="banner" value="${banner}">
                            <br>
                            <label>Description:</label>
                            <input id="description" type="text" name="description" value="${description}">
                            <br>
                            <label>Proxy Tags:</label>
                            <input id="i7" id="proxy" type="text" name="description" value="${memberObject.proxy_tags}">
                            <br>
                            <label>Avatar:</label>
                            <input id="i8" id="avatar" type="text" name="description" value="${avatar}">
                            <br>
                            <br>
                            <label>Please enter your PK token:</label>
                            <input id="token" type="text" name="token">                            
                        </form>
                    </div>
                </div>`
                
                let submit = `<button style="vertical-align:middle;" onclick="buildObject()">Submit</button>

                <hr style="width:50%; margin-right:50%;">
                <br>
                <div id="prompts">
                    <br>
                </div>`



                let preview ="";
                if(memberObject.banner_url != null) {
                    console.log(memberObject.banner_url)
                    preview += `<img src="${memberObject.banner_url}">`
                }
                if(memberObject.avatar_url != null) {
                    console.log(memberObject.avatar_url)
                    preview += `<h3>Avatar</h3><img id="avatarPreview" src="${memberObject.avatar_url}" style="max-width:200px">`
                }
    document.getElementById("fields").innerHTML = html;
    document.getElementById("preview").innerHTML = preview;
    document.getElementById("submit").innerHTML = submit;
}

async function buildObject() {
    let html = `<div id="status-waiting"></div>`
    document.getElementById("status").innerHTML = html;

    const memberObject = await getMember();

    let name = document.getElementById("i1").value;
    let birthday = document.getElementById("i2").value;
    let colour = document.getElementById("i3").value;
    let pronouns = document.getElementById("i4").value;
    let banner = document.getElementById("i5").value;
    let description = document.getElementById("description").value;
    let proxy_tags = document.getElementById("i7").value;
    let avatar = document.getElementById("i8").value;
    let token = document.getElementById("token").value;

    console.log(banner)

    memberObject.name = name;
    memberObject.birthday = birthday;
    memberObject.color = colour;
    memberObject.pronouns = pronouns;
    memberObject.banner_url = banner;
    memberObject.description = description;
    memberObject.avatar_url = avatar;

    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", 'https://api.pluralkit.me/v2/members/' + memberObject.id, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", token);

    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status === 200) {
                let html = `<h2 style="animation-name:fade; animation-duration:3.5s; opacity: 0%;">Member successfully updated!</h2>`
                document.getElementById("prompts").innerHTML = html;
                document.getElementById("status").innerHTML = `<div id="status-success"></div>`;
                document.getElementById("avatarPreview").innerHTML = `<img src ="${memberObject.avatar_url}">`;
            }
            if(xhr.status === 401) {
                let html = `<h2 style="animation-name:fade; animation-duration:3.5s; opacity: 0%;">Token is missing or invalid</h2>`
                document.getElementById("status").innerHTML = `<div id="status-fail"></div>`;
                document.getElementById("prompts").innerHTML = html;
            }
        }
    }
    xhr.send(JSON.stringify(memberObject));   
}