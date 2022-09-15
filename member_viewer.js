const queryString = window.location.search;
const memberId = new URLSearchParams(queryString).get("member");

renderFields();


async function getMember() {
    let response = await fetch("https://api.pluralkit.me/v2/members/" + memberId);
    if (response.status != 200) {
        return null
    }
    return await response.json()
}

async function renderFields() {
    const member = await getMember();
    console.log(member)

    let avatar = "blank.png";
    if(member.avatar_url != null) {
        avatar = member.avatar_url;
    }

    let pronouns = "No pronouns"
    if(member.pronouns != null) {
        pronouns = member.pronouns;
    }

    let birthday = "No birthday";
    if(member.birthday != null) {
        birthday = member.birthday;
    }

    let description = "No description";
    if(member.description != null) {
        description = member.description;
    }


    let html = `<div id="inner-contents">
                    <img src="${avatar}"></img>
                    <h2 id="name">${member.name}</h2>
                    <h3><code>${member.id}</code></h3>
                    <h3>${pronouns}</h3>
                    <h3>${birthday}</h3>
                    <p>${description}</p>
                    <div id="proxytags"></div>
                </div>`
    document.getElementById("member-container").innerHTML = html;
    
    if(member.color != null) {
        document.getElementById("name").style.borderTopColor = member.color;
    }

    if(member.proxy_tags == null) {
        document.getElementById("proxytags").innerHTML = `<h3>No ProxyTags</h3>`
    } else {
        html = `<h3>ProxyTags: </h3>`
        html += `<h3>` 
        html += await formatProxies(member.proxy_tags);
        html += `</h3>`
        document.getElementById("proxytags").innerHTML = html;
    }
    
}

async function formatProxies(array) {
    console.log(array)
    let html = "";
    for(let i = 0; i < array.length; i++) {
        let str = "";
        if(array[i].prefix != null) {
            str = array[i].prefix
        }
        str += "text"
        if(array[i].suffix != null) {
            str += array[i].suffix
        }

        html += `<li><code>${str}</code></li>`
    }
    return html;
}