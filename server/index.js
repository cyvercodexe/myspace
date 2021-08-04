const fs = require("fs");
const dir = process.cwd();
const sha = require("crypto-js/sha256");


var users = {
	new: (user, password) => {
		server = `${dir}/server/profiles/${user}`
		client = `${dir}/client/profiles/${user}`

		fs.mkdirSync(server, { recursive: true })
		fs.mkdirSync(client, { recursive: true })

		fs.copyFile(`${dir}/client/pfp.jpg`, `${client}/pfp.jpg`, (err) => {
			if (err) {throw err}
		});

		fs.writeFileSync(`${server}/credentials.json`, JSON.stringify({
			name: user,
			password: sha(user + password).toString(),
		}), "utf8")

		fs.writeFileSync(`${client}/info.json`, JSON.stringify({
			age: "",
			name: "",
			desc: "",
			quote: "",
			gender: "",
			country: "",
		}), "utf8")

		fs.writeFileSync(`${client}/tables.json`, "[]", "utf8")

		fs.writeFileSync(`${client}/about.json`, JSON.stringify({
			friends: ["tom"],
			wantomeet: "",
			comments: [
				{
					user: "tom",
					comment: "Thx 4 the add!"
				}
			]
		}), "utf8")
	},
	stats: () => {
		let users = [];
		fs.readdir(`${dir}/client/profiles`, (err, files) => {
			if (err) {throw err}
			files.forEach((file) => {
				users[users.length] = file;
			});
			fs.writeFileSync(`${dir}/client/stats.json`, JSON.stringify({
				users: users,
				user_count: users.length,
			}), "utf8")
		});
	}
}

//users.new("tom", "test")
users.stats()
