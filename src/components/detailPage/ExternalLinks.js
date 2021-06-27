const ExternalLinks = ({ link }) => {
  let bg;
  switch (link.site) {
    case "Twitter":
    case "Hulu":
    case "Funimation":
      bg = "blue";
      break;
    case "Official Site":
      bg = "green";
      break;
    case "Youtube":
    case "Tubi TV":
    case "Netflix":
      bg = "red";
      break;
    case "Crunchyroll":
    case "VRV":
      bg = "purple";
      break;
    case "AnimeLab":
    case "Amazon":
      bg = "yellow";
      break;
    default:
      bg = "gray";
  }

  return (
    <li>
      <a
        className={`transition-all ease-in block text-center py-2 my-3 text-base font-medium  bg-${bg}-300
               hover:bg-${bg}-500 active:bg-${bg}-600 active:text-white
   shadow-lg rounded-sm active:shadow-inner`}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.site}
      </a>
    </li>
  );
};

export default ExternalLinks;
