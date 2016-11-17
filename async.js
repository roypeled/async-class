var id = getId();
var rootUrl = "https://jsonplaceholder.typicode.com/";

getAll(id)
	.then(function(){
		console.log("Done!");
	});

function printUser(user) {
	var source = $("#userTpl");
	var tpl = Handlebars.compile(source.html());
	var compiled = tpl(user);
	$("#user-container").append(compiled);

	return id;
}

function printPosts(posts) {
	var source = $("#postsTpl");
	var tpl = Handlebars.compile(source.html());
	var compiled = tpl(posts);
	$("#posts-container").append(compiled);

	return id;
}

function getId(){
	return document.location.search.replace("?id=", "");
}




function getUser(id){
	return new Promise(function(resolve, reject){
		$.getJSON(rootUrl + "users/" + id, resolve)
			.error(reject);
	});
}

function getPosts(userId){
	return new Promise(function(resolve, reject) {
		setTimeout(function () {
			$.getJSON(rootUrl + "posts?userId=" + id, resolve);
		}, 3000);
	});
}

function getAlbums(userId){
	return new Promise(function(resolve, reject) {
		$.getJSON(rootUrl + "albums?userId=" + id, resolve);
	});
}

function getTodos(userId){
	return new Promise(function(resolve, reject) {
		$.getJSON(rootUrl + "todos?userId=" + id, resolve);
	});
}

function getAll(id) {
	return Promise.all([
			getUser(id),
			getPosts(id),
			getAlbums(id),
			getTodos(id)])
		.then(function (values) {
			var user = values[0];
			var posts = values[1];
			var albums = values[2];
			var todos = values[3];

			printUser(user);
			printPosts(posts);
			console.log(albums);
			console.log(todos);
		});
}










