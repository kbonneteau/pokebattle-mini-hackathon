import { createNewElement } from "../services/templateFunctions";

const BEM_BLOCK = "footer";

const Footer = () => {
  const creatorDetails = {
    andy: createNewElement("p", [`${BEM_BLOCK}__andy`], "Andy Song"),
    kayla: createNewElement("p", [`${BEM_BLOCK}__kayla`], "Kayla Bonneteau"),
  };

  const footer = createNewElement("footer", [`${BEM_BLOCK}`]);
  const copyright = createNewElement(
    "p",
    [`${BEM_BLOCK}__copyright`],
    "Made by"
  );
  const creators = createNewElement("div", [`${BEM_BLOCK}__creators`]);

  for (const name in creatorDetails) {
    creators.appendChild(creatorDetails[name]);
  }

  footer.appendChild(copyright);
  footer.appendChild(creators);

  return footer;
};

export default Footer;
