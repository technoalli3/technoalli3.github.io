const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");


renderTitle();
renderAttributes();
renderMembers();


async function getSystem() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system);

    if (response.status != 200) {
        return null
    }

    return await response.json()
}

async function getMembers() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system + "/members");

    if (response.status != 200) {
        return null
    }

    return await response.json()
}

async function renderTitle() {
    const sysObject = await getSystem();

    let name;
    if(sysObject.name != null) {
        name = sysObject.name;
    } else {
        name = system;
    }
    
    let colour;
    if(sysObject.color != null) {
        colour = sysObject.color;
    } else {
        colour = "FFFFFF";
    }

    let html

    if(sysObject.avatar_url != null) {
        html = `<h1 style = "background-image:url('${sysObject.avatar_url}');"><span style="color: #${colour};">${name}</span> System Info</h1>`;
    } else {
        html = `<h1><span style="color: #${colour};">${name}</span> System Info</h1>`;
    }

    document.getElementById("systemTitle").innerHTML = html;
}

async function renderAttributes() {
    const sysObject = await getSystem();
    let html

    if(sysObject.avatar_url == null) {
        html = `<img src="blank_system.png" alt="Profile Picture">`
    } else {
        html = `<img src="${sysObject.avatar_url}" alt="Profile Picture">`
    }

    html += `<hr style="width:25%; margin-right:75%">`
    html += `<h2>Description:</h2>`

    if(sysObject.description == null) {
        html += `<p>No description</p>`
    } else {
        html += await getDescription(sysObject);
    }

    html += `<br><hr style="width:25%; margin-right:75%">`
    html += `<h2>System Members:</h2>`

    document.getElementById("attributes").innerHTML = html;
}



async function getDescription(sysObject) {
    return marked.parse(sysObject.description);
}

async function renderMembers() {
    const members = await getMembers();

    console.log(members)
    let html

    for(let i = 0; i < members.length; i++) {
        // Avatar logic
        let avatar

        if (members[i].avatar_url != null) {
            // member's avatar
            avatar = `<img src="${members[i].avatar_url}" alt="Profile Picture", style="float:left;">`
        }
        else {
            // Use placeholder avatar if there is no avatar.
            avatar = `<img src="blank.png" alt="Profile Picture", style="float:left;">`
        }

        // Pronouns logic (Alli)
        let memberPronouns

        if (members[i].pronouns != null) {
            memberPronouns = members[i].pronouns
        } else {
            // Fallback for if member has no pronouns set
            memberPronouns = "This member has no pronouns set."
        }

        // Build member item
        let htmlSegment = `<div class="fronter grid-item">
                            ${avatar}
                            <h2>${members[i].name}</h2>
                            <p>${memberPronouns}</p>
                        </div>
                        <br style="clear:both">`;

        html += htmlSegment;
    }
    document.getElementById("members").innerHTML = html;
}
