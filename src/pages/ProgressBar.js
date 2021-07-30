import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";

const ProgressBar = () => {
  const location = useLocation();
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

    const watchLoadingBar = client
      .watchQuery({
        query: READ_ISLOADING,
        fetchPolicy: "cache-only",
      })
      .subscribe({
        next: ({ data }) => {
          loadingParam = data.loadingbar.isLoading;
          bar.style.left = `${loadingParam}%`;
          console.log(loadingParam);

          if (loadingParam !== 0 ) {
            isChanged = !isChanged;
          } else if (loadingParam === 0) {
            isChanged = isChanged;
          }

        },
        error: (e) => console.error(e),
      });

      // if(loadingParam > 5){
      //   bar.style.left = "300px";
      // }
  }, [isChanged]);
  return (
    <div
      ref={progressRef}
      className="w-full h-1 bg-green-500 fixed top-0 left-0 z-50 transition-all duration-1000"
    >
      <div
        className="absolute bg-indigo-900 w-full h-full transition-all duration-1000"
        style={{ left: "0" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
