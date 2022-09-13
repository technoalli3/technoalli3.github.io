const queryString = window.location.search;
const system = new URLSearchParams(queryString).get("sys");


//order of functions
getSystem();
renderMembers();
renderNewButton();




async function getSystem() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system);
    if (response.status != 200) {
        return null
    }
    return await response.json()
}

async function renderMembers() {
    const members = await getMembers();
    console.log(members)
    let html = `<div style="background-color: #5499C7" id="table-item">
                    <div class="subgrid">
                        <div id="subgrid-item" style="background-color:#F39C12">
                            <h3 style="margin-left:10%">Name</h3>
                        </div>
                        <div id="subgrid-item">
                            <h3><code>ID</code></h3>
                        </div>
                        <div id="button">
                            <form action="member_editor.html">
                                <h3>Edit Member</h3>
                            </form>
                        </div>
                    </div>
                </div>`
    for(let i = 0; i < members.length; i++) {
        let memberId
        memberId = members[i].id;
        // Build member item
        let htmlSegment = `<div id="table-item">
                                <div class="subgrid">
                                    <div id="subgrid-item" style="background-color:#7D6608">
                                        <h3 style="margin-left:10%">${members[i].name}</h3>
                                    </div>
                                    <div id="subgrid-item">
                                        <h3><code>${members[i].id}</code></h3>
                                    </div>
                                    <div id="button">
                                        <form action="member_editor.html">
                                            <button type="submit" name="members" value="${members[i].id}">Edit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>`
        html += htmlSegment;
    }
    document.getElementById("members").innerHTML = html;
}

async function getMembers() {
    let response = await fetch("https://api.pluralkit.me/v2/systems/" + system + "/members");
    if (response.status != 200) {
        return null
    }
    return await response.json()
}

async function renderNewButton() {
    let html = `<form action="new_member.html">
                    <button type="submit" name="sys" value="${system}">Create a new member</button>
                </form>`
    document.getElementById("new-button").innerHTML = html;
}

