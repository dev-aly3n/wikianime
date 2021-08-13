import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";
import SearchList from "./SearchList";

const Header = () => {
  const client = useApolloClient();
  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const navLinksRef = useRef(null);
  const homeLinkRef = useRef(null);
  const animeLinkRef = useRef(null);

  // modern Navigation bar code start here
  const scrollerContainer = document.getElementById("root");

  useEffect(() => {
    const burger = burgerRef.current;
    const nav = navLinksRef.current;
    const navLinks = [homeLinkRef.current, animeLinkRef.current];

    const navSlide = () => {
      //toggle nav
      burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
        //animate links
        navLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = "";
          } else {
            link.style.animation = `navLinkFade 0.6s ease both ${
              index / 5 + 0.3
            }s`;
          }
        });

        //burger animation
        burger.classList.toggle("toggle");
      });

      document.addEventListener("click", (e) => {
        if (e.target.matches(".navigation")) return;
        nav.classList.remove("nav-active");
        burger.classList.remove("toggle");
        navLinks.forEach((link) => {
          link.style.animation = "";
        });
      });
    };
    navSlide();
    // modern Navigation bar code stop here

    let prevScrollpos = Number(scrollerContainer.scrollTop.toFixed(2));
    scrollerContainer.addEventListener("scroll", () => {
      let currentScrollPos = Number(scrollerContainer.scrollTop.toFixed(2));
      if (prevScrollpos > currentScrollPos && currentScrollPos > 300) {
        navRef.current.style.top = "0";
        navRef.current.style.backgroundColor = "rgba(49,46,129,1)";
      } else if (currentScrollPos < 300 || currentScrollPos === 0) {
        navRef.current.style.top = "0";
        navRef.current.style.backgroundColor = "rgba(49,46,129,0.7)";
      } else {
        navRef.current.style.top = "-8vh";
      }
      prevScrollpos = currentScrollPos;
    });

    window.addEventListener("touchmove", () => {
      let currentScrollPos = Number(scrollerContainer.scrollTop.toFixed(2));
      if (prevScrollpos > currentScrollPos && currentScrollPos > 300) {
        navRef.current.style.top = "0";
        navRef.current.style.backgroundColor = "rgba(49,46,129,1)";
      } else if (currentScrollPos < 300 || currentScrollPos === 0) {
        navRef.current.style.top = "0";
        navRef.current.style.backgroundColor = "rgba(49,46,129,0.7)";
      } else {
        navRef.current.style.top = "-8vh";
      }
      prevScrollpos = currentScrollPos;
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", LinkClickHandler);
    });
    // eslint-disable-next-line
  }, []);

  const LinkClickHandler = () => {
    client.writeQuery({
      query: gql`
        query WriteIsLoading {
          loadingbar {
            isLoading
          }
        }
      `,
      data: {
        // Contains the data to write
        loadingbar: {
          __typename: "LoadingBar",
          isLoading: 30,
        },
      },
    });
  };

  const headerLinks = [
    {
      to: "/",
      text: "Home",
      activeStyle: { backgroundColor: "#EEF2FF", color: "#312E81" },
      ref: homeLinkRef,
    },
    {
      to: "/search/",
      text: "Anime",
      activeStyle: { backgroundColor: "#EEF2FF", color: "#312E81" },
      ref: animeLinkRef,
    },
  ];

  return (
    <nav ref={navRef} id="navigation" className="navigation navigation-container">
      <div className="logo group">
        <h1 className=" group-hover:animate-none">WA</h1>
        <span
          className="group-hover:animate-none"
        >
          Wiki Anime
        </span>
      </div>
      <ul ref={navLinksRef} className="nav-links navigation">
        {headerLinks.map((link) => {
          return (
            <li key={link.text} ref={link.ref}>
              <NavLink activeStyle={link.activeStyle} to={link.to} exact={true}>
                {link.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <SearchList />

      <div ref={burgerRef} className="navigation burger">
        <div className="navigation line1"></div>
        <div className="navigation line2"></div>
        <div className="navigation line3"></div>
      </div>
    </nav>
  );
};

export default Header;