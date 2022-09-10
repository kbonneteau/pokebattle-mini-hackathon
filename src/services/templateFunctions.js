/**
 * Creates a new document node for appending to current document
 * @param {string} type
 * @param {array} classNames
 * @param {string} text
 */
export const createNewElement = (type, classNames = [], text = "") => {
  const allowedTags = [
    "header",
    "footer",
    "div",
    "section",
    "p",
    "span",
    "ul",
    "ol",
    "li",
    "img",
    "h2",
    "form",
    "label",
    "select",
    "button",
  ];

  if (!allowedTags.includes(type)) {
    throw new Error(`${type} is not an allowed tag`);
  }
  if (!Array.isArray(classNames)) {
    throw new TypeError("arg classNames must be an array");
  }

  const newNode = document.createElement(type);
  classNames.forEach((className) => newNode.classList.add(className));
  newNode.innerText = text;
  return newNode;
};
