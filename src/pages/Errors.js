//libs
import { useApolloClient, gql } from "@apollo/client";

const Errors = ({ errMsg }) => {
  //for hiding progress bar on load
  const client = useApolloClient();
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
        isLoading: 80,
      },
    },
  });

  let failedToFetch, mediaNotFound, tooManyRequest, wtfError;

  switch (errMsg) {
    case "Failed to fetch":
      failedToFetch = 70;
      tooManyRequest = 15;
      mediaNotFound = 10;
      wtfError = 5;
      break;

    case "Not Found.":
      mediaNotFound = 70;
      failedToFetch = 15;
      tooManyRequest = 10;
      wtfError = 5;
      break;
    case "Too Many Requests.":
      tooManyRequest = 70;
      failedToFetch = 15;
      mediaNotFound = 10;
      wtfError = 5;
      break;

    default:
      wtfError = 70;
      tooManyRequest = 15;
      failedToFetch = 10;
      mediaNotFound = 5;
      break;
  }

  return (
    <div className="error-page-container ">
      <p>
        <span>!</span> <strong>WAIT! There is a problem!</strong>
        <br /> Here are 4 possibilities why you seeing this page by different
        priority:
      </p>
      <div>
        <div className="bg-blue-300" style={{ order: -failedToFetch }}>
          <div className="error-possibility">
            <div>
              <div
                className="error-pos-dash-style"
                style={{ width: `${failedToFetch}%` }}
              ></div>
              <span style={{ left: `${failedToFetch}%` }}>
                {failedToFetch}% possibility
              </span>
            </div>
          </div>
          <strong>
            We coudn't get the data!
            <br /> here is some reasons for that:
          </strong>{" "}
          <br />
          1- You are a user from Iran{" "}
          <img
            alt=""
            className="inline-block"
            width={15}
            height={15}
            src={process.env.PUBLIC_URL + "/media/iranflag.gif"}
          />{" "}
          (or other country with limited internet) and you need to{" "}
          <strong>turn on your VPN</strong> to see the contents! <br /> <br />
          2- You need to check your connection! maybe it lost. <br /> <br />
          3- The Server is down currently! (Low chance)
        </div>
        <div className=" bg-yellow-300 " style={{ order: -mediaNotFound }}>
          <div className="error-possibility">
            <div>
              <div
                className="error-pos-dash-style"
                style={{ width: `${mediaNotFound}%` }}
              ></div>
              <span style={{ left: `${mediaNotFound}%` }}>
                {mediaNotFound}% possibility
              </span>
            </div>
          </div>
          <strong>Media not Found! it may happen when:</strong> <br />
          1- You trying to reach a media with specific ID that is not exist in
          the server! <br /> <br />
          2- Do not try to add ID number 2 at the address bar after /anime/2 .
          it doesn't exist, don't try that! <br /> <br />
          3- The media was deleted from the server but still exist in relation
          of other media! (Low chance)
        </div>
        <div className=" bg-pink-300" style={{ order: -tooManyRequest }}>
          <div className="error-possibility">
            <div>
              <div
                className="error-pos-dash-style"
                style={{ width: `${tooManyRequest}%` }}
              ></div>
              <span style={{ left: `${tooManyRequest}%` }}>
                {tooManyRequest}% possibility
              </span>
            </div>
          </div>
          <strong>Toooooooo many Request! it may happen when:</strong> <br />
          1- You trying to open more than 50 diferent pages in less than one
          minute! (WTF dude?) <br />
          <br />
          2- You are a bot! please get out my site stupid bot! DO NOT come back
          again, or no I will *** *** ***.
        </div>
        <div className=" bg-red-300 " style={{ order: -wtfError }}>
          <div className="error-possibility">
            <div>
              <div
                className="error-pos-dash-style"
                style={{ width: `${wtfError}%` }}
              ></div>
              <span style={{ left: `${wtfError}%` }}>
                {wtfError}% possibility
              </span>
            </div>
          </div>
          <strong>We really really dont know WTF is going on!</strong>
          <br /> <br />
          If you know please contact me from links at the footer and report the
          bug! I very appreciate that. <br /> <br />
          It can be because of changes that may happend on the server! (Low
          chance)
        </div>
      </div>
    </div>
  );
};

export default Errors;
