const fs = require("fs");
const sha256 = require("crypto-js/sha256")

function newUser(user, password) {
    dir = process.cwd();
    server = `${dir}/server/profiles/${user}`
    client = `${dir}/client/profiles/${user}`
    fs.mkdirSync(server, { recursive: true })
    fs.mkdirSync(client, { recursive: true })
    fs.writeFileSync(`${server}/credentials.json`, JSON.stringify({ name: user, password: sha256(password).toString() }), "utf8")

}

newUser("Tom")
fs.copyFile(`${dir}/client/pfp.jpg`, `${client}/pfp.jpg`, (err) => {
    if (err) {throw err}
    fs.writeFileSync(`${server}/credentials.json`, "test", "utf8")
});