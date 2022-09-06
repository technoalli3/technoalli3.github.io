const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");


renderTitle();

async function getSystem() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system);

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
    
    let html = `<h1><span style="color: #${colour};">${name}</span> System Info</h1>`;

    document.getElementById("systemTitle").innerHTML = html;
}

async function renderAttributes() {
    
}
