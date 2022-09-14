const queryString = window.location.search;
const memberId = new URLSearchParams(queryString).get("member");




async function getMember() {
    let response = await fetch("https://api.pluralkit.me/v2/members/" + memberId);
    if (response.status != 200) {
        return null
    }
    return await response.json()
}

async function renderFields() {
    const member = await getMember();

    let avatar = "blank.png";
    if(member.avatar_url != null) {
        avatar = member.avatar_url;
    }

    let html = `<div id="inner-contents">
                    <div>
                        <img src="${avatar}"></img>
                    </div>
                    <div>
                        <h2>${member.name}</h2>
                    </div>
                </div>`
}