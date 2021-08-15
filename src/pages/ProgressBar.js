//libs
import React, { useRef, useEffect } from "react";
import { useApolloClient, gql } from "@apollo/client";

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

  //we want to subscribe a cache data (READ_ISLOADING) and run a function when the cache changes
  //... if the new data is 30, then we sould start a brogress bar to 30%
  //...if the new data is 80, then we need to complete the progress bar to 80 and then 100% and then hide it
  useEffect(() => {
    const bar = progressRef.current.firstElementChild;
    const shining = progressRef.current.children[1];
    client
      .watchQuery({
        query: READ_ISLOADING,
        fetchPolicy: "cache-only",
      })
      .subscribe({
        next: ({ data }) => {
          // eslint-disable-next-line
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
          // eslint-disable-next-line
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
