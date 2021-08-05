const fs = require("fs");
const dir = process.cwd();
const sha = require("crypto-js/sha256");


var users = {
	// Creates new users
	new: (user, password) => {
		let server = `${dir}/server/profiles/${user}`
		let client = `${dir}/client/profiles/${user}`

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

		fs.writeFileSync(`${client}/user.css`, "/* Your custom CSS */", "utf8")
	},
	// Makes profiles in premade_profiles/
	// Also deletes existing ones
	premade: () => {
		let premade = `${dir}/server/premade_profiles`
		fs.readdir(premade, (err, files) => {
			if (err) {throw err}

			files.forEach(file => {
				let profile = `${dir}/client/profiles/${file}`
				if (fs.existsSync(profile)) {
					fs.rmSync(profile, {recursive: true});
				}

				fs.readdir(`${premade}/${file}`, (err, profile_files) => {
					if (err) {throw err}

					fs.mkdirSync(profile, (err) => {if (err) {throw err}});
					profile_files.forEach(profile_file => {
						fs.copyFileSync(`${premade}/${file}/${profile_file}`, `${profile}/${profile_file}`);
					})
				})
			})
		})
	},
	// Generates stats.json
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
users.premade()
