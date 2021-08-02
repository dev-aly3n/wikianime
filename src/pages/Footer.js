
const Footer = () => {
  return (
    <div className=" pt-14 bg-indigo-900 text-indigo-50 w-full">
      <div className="h-full flex flex-col md:flex-row justify-center md:justify-evenly items-center pb-10">
        <div className="w-10/12 ssm:w-1/2 md:w-1/4 text-base my-5">
          <p>
            This Single Page Application built by the power of React, graphQL
            and Tailwind css and ect... <br />
            this takes 50 days from me to built, however I learnt a lot at this
            time beside working on my application <br />
            anyway thank you to visiting my app and a big thanks to anilist
            graphQL server <br />
            <p className="text-red-400">if you think there is something wrong, then please open the application with chrome browser.</p>
          </p>
        </div>

        <div className=" flex justify-around items-center group my-5">
        <h1 className="text-white text-7xl font-bold select-none animate-textShadowPopTl group-hover:animate-textShadowPopTr">
          WA
        </h1>
        <span className="self-end text-purple-50 font-bold animate-textShadowPopTl group-hover:animate-textShadowPopTr  ml-px">
          Wiki Anime
        </span>
      </div>

        <div className="flex flex-col justify-between items-center w-10/12 ssm:w-1/2 md:w-1/4 my-5">
          <h4 className="text-2xl font-bold "> Links</h4>
          <ul>
            <li className=" flex hover:text-yellow-500 my-1">
            <img className="w-5 mx-1" src={"https://img.pngio.com/github-logo-icon-of-glyph-style-available-in-svg-png-eps-ai-github-icon-png-256_256.png"} />
              <a
                href="https://github.com/dev-aly3n"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                dev-aly3n GitHub
              </a>
            </li>
            <li className="flex hover:text-yellow-500 my-1">
            <img className="w-5 mx-1" src={"https://www.strategy-works.com/wp-content/uploads/2017/12/Icon-LinkedIn.png"} />
              <a
                href="https://www.linkedin.com/in/aly-mohamadi-4bb966212/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                dev-aly3n LinkedIn
              </a>
            </li>
            <li className=" flex hover:text-yellow-500 my-1">
            <img className="w-5 mx-1" src={"https://telegram.org/img/td_icon.png"} />
              <a
                href="https://telegram.me/aly3n"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                dev-aly3n Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />

      <div className="text-center bg-indigo-900"> All right reserved © dev-aly3n 2021</div>
    </div>
  );
};

export default Footer;
