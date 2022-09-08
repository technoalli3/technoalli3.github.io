const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");


renderTitle();
renderAttributes();
renderMembers();
backButton();

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
    html = `<h1><span style="color: #${colour};">${name}</span> System Info</h1>`;

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
    let html = "";

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

        let memberColour

        if(members[i].color != null) {
            memberColour = members[i].color;
        } else {
            memberColour = "202225";
        }

        let description = "";
        if(members[i].description != null) {
            description = marked.parse(members[i].description);
        }

        // Build member item
        let htmlSegment = `<div style="border-left: 4px solid #${memberColour};" class="fronter grid-item">
                            ${avatar}
                            <h2>${members[i].name}</h2>
                            <h4 style="margin-right:3%">${memberPronouns}</h4>
                            <div>${description}</div>
                        </div>`;

        html += htmlSegment;
    }
    document.getElementById("members").innerHTML = html;
}

async function backButton() {
    let html = `<form action="index.html" method="get">
                        <button name="sys" value="${system}" type="submit">Go Back</button>
                    </form>`

    document.getElementById("back").innerHTML = html;
}