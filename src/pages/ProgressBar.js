import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";

const ProgressBar = () => {
  const progressRef = useRef(null);
  const client = useApolloClient();

  const READ_ISLOADING = gql`
    query ReadLoading {
      loadingbar {
        isLoading
      }
    }
  `;
  let loadingParam;
  let isChanged = false;

  useEffect(() => {
    const bar = progressRef.current.firstElementChild;
    const shining = progressRef.current.children[1];
    const watchLoadingBar = client
      .watchQuery({
        query: READ_ISLOADING,
        fetchPolicy: "cache-only",
      })
      .subscribe({
        next: ({ data }) => {
          loadingParam = data.loadingbar.isLoading;
          if (loadingParam < 50) {
            bar.classList.add("first-load-animate");
            progressRef.current.classList.add("last-load-animate-for-parent");
            shining.classList.add("shining-bar-animate");
          } else {
            progressRef.current.classList.remove(
              "last-load-animate-for-parent"
            );
            bar.classList.remove("first-load-animate");
            bar.classList.add("last-load-animate");
            progressRef.current.classList.add("last-load-animate-for-parent");

            setTimeout(() => {
              bar.classList.remove("last-load-animate");
              progressRef.current.classList.remove(
                "last-load-animate-for-parent"
              );
              shining.classList.remove("shining-bar-animate");
            }, 1000);
          }
          isChanged = !isChanged;
        },
        error: (e) => console.error(e),
      });
  }, [isChanged]);
  return (
    <div ref={progressRef} className="progress-bar-container">
      <div></div>
      <div></div>
    </div>
  );
};

export default ProgressBar;
