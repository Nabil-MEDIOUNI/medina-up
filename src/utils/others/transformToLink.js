function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => `<a 
  style="color:#037Ef3; fontWeight:500; text-decoration: none;"
  target="_blank" rel="noopener noreferrer"
  href="${url}">${url}
  </a>`);
}

export default urlify;
