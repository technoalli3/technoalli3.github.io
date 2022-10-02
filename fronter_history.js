const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");
let ids = [];
let html = `<ol>`

postSwitches();


async function getMembers() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system + "/members");
    if (response.status != 200) {
        return null
    }
    return await response.json()
}

async function getSwitches() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system + "/switches");
    if (response.status != 200) {
        return null
    }
    return await response.json()
    

}

async function postSwitches() {
    const switches = await getSwitches();
    const members = await getMembers();

    members.forEach(member => {
        let item = ""
        item += member.id;
        item += member.name;
        ids.push(item)
    })

    switches.forEach(async fronter => {
        const front = fronter.members

        if(front.length == 1) {
            let query = front[0]
            await getOneName(query);
        } else if(front.length == 0) {
            html += `<li>--Switched out--</li>`
        } else {
            await getManyNames(front);
        }
    })

    html += `</ol>`
    document.getElementById("fronter-list").innerHTML = html
}

async function getOneName(query) {
    let index = 0;
    for(let i = 0; i < ids.length; i++) {
        if(ids[i].includes(query)) {
            index = i;
        }
    }
    let listItem = ids[index].substring(5)
    html += `<li>${listItem}</li>`;
    return index;
}

async function getManyNames(front) {
    let listItem = "<li>"
    for(let i = 0; i < front.length; i++) {
        let query = front[i]

        for(let y = 0; y < ids.length; y++) {
            if(ids[y].includes(query)) {
                index = i;
            }
        }
        listItem += ids[index].substring(5)
        if(i != front.length - 1) {
            listItem += ", "
        }
    }
    listItem += `</li>`
    html += listItem
}