var $ = document;

async function loadProfile(id) {
	let tables = await (await fetch(`profiles/${id}/tables.json`)).json();
	let about = await (await fetch(`profiles/${id}/about.json`)).json();
	let info = await (await fetch(`profiles/${id}/info.json`)).json();

	$.querySelector(".box.about img").src = `profiles/${id}/pfp.jpg`
	$.querySelector(".box.about .quote").innerHTML = `"${info.quote}"`;
	$.querySelector(".box.about .gender").innerHTML = info.gender;
	$.querySelector(".box.about .age").innerHTML = info.age + " years old";
	$.querySelector(".box.about .country").innerHTML = info.country;

	$.querySelector(".box.blurbs .about").innerHTML = about.aboutme;
	$.querySelector(".box.blurbs .meet").innerHTML = about.wanttomeet;

	$.querySelector(".box.friends num").innerHTML = about.friends.length;

	$.querySelector(".boxes .left").style.display = "block";
	$.querySelector(".boxes .right").style.display = "block";

	let newFriend = async (index) => {
		user = await (await fetch(`profiles/${about.friends[index]}/info.json`)).json();
		$.querySelector(".box.friends .list").innerHTML += `<div class="friend"><a href="">${user.name}<img src="/profiles/${about.friends[index]}/pfp.jpg"></img></div>`
	}
		
	if (about.friends.length >= 8) {
		for (let i = 0; i < 8; i++) {
			newFriend(i)
		}
	} else {
		for (let i = 0; i < about.friends.length; i++) {
			newFriend(i)
		}
	}

	for (let i = 0; i < tables.length; i++) {
		$.querySelector(".left").innerHTML += `<div class="box table interests outline"><div class="head">${tables[i].title}</div><div class="table"></div></div>`
		for (let ii = 0; ii < tables[i].contents.length; ii++) {
			$.querySelectorAll(".left .box.table .table")[i].innerHTML += `<div class="tr"><div class="title">${tables[i].contents[ii].title}</div><div class="content">${tables[i].contents[ii].content}</div></div>`
			// if (tables[i].width) {
			// 	let divs = $.querySelectorAll(".left .box.table .table")[i].querySelectorAll(".title");
			// 	for (let iii = 0; iii < divs.length; iii++) {
			// 		divs[iii].style.width = `${tables[i].width}px`
            //
			// 	}
			// }
		}
	}

	$.body.innerHTML = $.body.innerHTML.replaceAll("USERNAME", id);
	$.body.innerHTML = $.body.innerHTML.replaceAll("USER", info.name);
	$.body.innerHTML = $.body.innerHTML.replaceAll("DOMAIN", location.origin);
}; loadProfile("tom")
