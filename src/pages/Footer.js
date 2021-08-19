const Footer = () => {
  return (
    <div className="footer-container">
      <div>
        <div className="footer-thank">
          <p>
            This single Page Application built by the power of React, graphQL
            and Tailwind css and ect... <br /> I didn't use any pre-built components 
            or ui library and all of these stuff has been built from the scratch. <br/>
            It has been taken 60 days time from me to build, however I learnt a lot at this
            time beside working on my application <br />
            anyway thank you to visiting my app and a big thanks to anilist
            graphQL server <br />
            <span>
              if you think there is something wrong, then please open the
              application with chrome browser.
            </span>
          </p>
        </div>

        <div className="footer-logo group">
          <h1 className="animate-textShadowPopTl group-hover:animate-textShadowPopTr">
            WA
          </h1>
          <span className="animate-textShadowPopTl group-hover:animate-textShadowPopTr ">
            Wiki Anime
          </span>
        </div>

        <div className="footer-links">
          <h4> Links</h4>
          <ul>
            <li>
              <img
                loading="lazy"
                width={20}
                height={20}
                alt=""
                src={
                  "https://img.pngio.com/github-logo-icon-of-glyph-style-available-in-svg-png-eps-ai-github-icon-png-256_256.png"
                }
              />
              <a
                href="https://github.com/dev-aly3n"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                dev-aly3n GitHub
              </a>
            </li>
            <li>
              <img
                loading="lazy"
                width={20}
                height={20}
                alt=""
                src={
                  "https://www.strategy-works.com/wp-content/uploads/2017/12/Icon-LinkedIn.png"
                }
              />
              <a
                href="https://www.linkedin.com/in/aly-mohamadi-4bb966212/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                dev-aly3n LinkedIn
              </a>
            </li>
            <li>
              <img
                loading="lazy"
                width={20}
                height={20}
                alt=""
                src={"https://telegram.org/img/td_icon.png"}
              />
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

      <div> All right reserved © dev-aly3n 2021</div>
    </div>
  );
};

export default Footer;
