async function systemInput() {
    document.getElementById("setup").style.backgroundColor = "white";
    document.getElementById("settings").style.backgroundColor = "white";

    document.getElementById("system").style.backgroundColor = "red";

    let html = `<form action="systems.html">
                    <label>Enter system ID:
                        <input required type="text" name="sys"></input>
                    </label>
                    <input type="hidden" name="home" value="true"></input>
                    <button type="submit">Submit</button>
                <form>`
    document.getElementById("input-fields").innerHTML = html;
}

async function setupInput() {
    document.getElementById("system").style.backgroundColor = "white";
    document.getElementById("settings").style.backgroundColor = "white";

    document.getElementById("setup").style.backgroundColor = "red";

    let html = `<form action="member_setup.html">
                    <label>Enter system ID:
                        <input required type="text" name="sys"></input>
                    </label>
                    <button type="submit">Submit</button>
                <form>
                <br>
                <a href="safety.html">Is this secure?</a>`
    document.getElementById("input-fields").innerHTML = html;
}