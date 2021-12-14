function copyShortURL() {
  var content = document.getElementById('copy-url');
  console.log(content)

  content.select();
  document.execCommand('copy');

  alert("Copied!");

}

module.exports = copyShortURL