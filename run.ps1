rm server/profiles/* -recurse -force
rm client/profiles/* -recurse -force
node server/index.js
tree . /f
