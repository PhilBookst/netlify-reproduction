import type { SearchType } from "types";

/* import SearchBox from "components/SearchBox"; */
/* import Navbar from "components/Navbar"; */
/* import AboveServiceText from "components/homepage/aboveServiceText"; */
/* import Service from "components/homepage/service"; */
/* import WhiteLogo from "components/logo/white"; */
/**/
import Head from "next/head";
import Link from "next/link";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

/* import { modeHelper } from "utils/tags/modeHelper"; */
import { fetchRandomItems } from "lib/data-fetching";

import dynamic from "next/dynamic";
import SearchBox from "components/SearchBox";

const ClipboardData = dynamic(() =>
  import("react-bootstrap-icons").then((icon) => icon.ClipboardData),
);

function Home({ profiles }) {
  const router = useRouter();

  const [data, setData] = useState<Omit<SearchType, "typename">>({
    term: "",
    userData: [],
    hashtagData: [],
    locationData: [],
  });

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("profile");
  const [showSelector, setShowSelector] = useState(false);

  const handleKeypress = useCallback(
    (e) => {
      if (e.key === "Enter" || e.type === "click") {
        router.push(`/search/${data.term}?search=${mode}`);
      }
    },
    [data.term, mode, router],
  );

  const changeModeOnInput = useCallback((event) => {
    if (event.target.value === "#") setMode("hashtag");
    else if (event.target.value === "@") setMode("profile");
    else
      setData((data) => ({
        ...data,
        term: event.target.value,
      }));
  }, []);

  useEffect(() => {
    return;

    if (!data.term) return;

    const delay = setTimeout(() => {
      if (data.term !== "") {
        fetch(`/.netlify/functions/search?term=${data.term}`)
          .then((res) => res.json())
          .then((json) => {
            setData(json as SearchType);
          })
          .catch((err) => {});
        return;
      }

      setData({
        term: "",
        userData: [],
        hashtagData: [],
        locationData: [],
      });
    }, 300);

    return () => clearTimeout(delay);
  }, [data.term]);

  return (
    <>
      <div className="container-fluid index p-0">
        {/* <Head> */}
        {/*   <title>Instagram Analysis and Search Engine</title> */}
        {/*   <meta */}
        {/*     key="description" */}
        {/*     name="description" */}
        {/*     content={ */}
        {/*       "View Instagram profiles, posts and videos without logging in" */}
        {/*     } */}
        {/*   /> */}
        {/*   <meta */}
        {/*     key="og:title" */}
        {/*     property="og:title" */}
        {/*     content={"Instagram Analysis and Search Engine"} */}
        {/*   /> */}
        {/*   <meta */}
        {/*     key="og:description" */}
        {/*     property="og:description" */}
        {/*     content={ */}
        {/*       "View Instagram profiles, posts and videos without logging in" */}
        {/*     } */}
        {/*   /> */}
        {/*   <link */}
        {/*     rel="canonical" */}
        {/*     href={`https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}`} */}
        {/*   /> */}
        {/* </Head> */}

        {/* Main */}
        <div className="bgContainer">
          <main id="homepage" className="bg-svg pb-3">
            {/* <Navbar showSearch={false} showGreySearch={false} black={false} /> */}

            <div className="container-fluid mt-5">
              <div
                className="row search-area"
                onClick={(e) => e.target === e.currentTarget && setShow(false)}
              >
                <div className="col-12 col-sm-6 text-center mx-auto my-2">
                  {/* <WhiteLogo /> */}
                  <form
                    className="form my-2"
                    onSubmit={(e) => e.preventDefault()}
                    onKeyPress={handleKeypress}
                  >
                    <div className="input-group mt-4 justify-content-center">
                      <div
                        className="pointer notSelectable mode-identifier"
                        onClick={() => setShowSelector(!showSelector)}
                      >
                        {/* <span className="d-flex"> */}
                        {/*   {modeHelper[mode].identifier} */}
                        {/* </span> */}
                        {/**/}
                        {/* <div */}
                        {/*   className="search-bar-mode-selector" */}
                        {/*   style={{ */}
                        {/*     visibility: showSelector ? "visible" : "hidden", */}
                        {/*   }} */}
                        {/* > */}
                        {/*   {Object.keys(modeHelper).map( */}
                        {/*     (key, index) => */}
                        {/*       key !== mode && ( */}
                        {/*         <p */}
                        {/*           className="pointer notSelectable mode-selector-options" */}
                        {/*           key={index} */}
                        {/*           onClick={() => setMode(key)} */}
                        {/*         > */}
                        {/*           {modeHelper[key].identifier} */}
                        {/*         </p> */}
                        {/*       ), */}
                        {/*   )} */}
                        {/* </div> */}
                      </div>
                      <input
                        type="search"
                        value={data.term}
                        className="form-control"
                        id="usernameInput"
                        placeholder={`Search`}
                        aria-label="Username"
                        onChange={changeModeOnInput}
                        onClick={(e) =>
                          e.target === e.currentTarget && setShow(true)
                        }
                      />
                      <a
                        className="btn btn-lg homepageSearchButton"
                        onClick={handleKeypress}
                      >
                        Search
                      </a>
                    </div>

                    <div className="row mt-4 justify-content-center searchOptions">
                      <div className="col-3 col-auto col-sm-2 px-1">
                        <button
                          type="button"
                          className={`btn searchSelection w-100 ${
                            mode === "profile" ? "searchSelected" : ""
                          }`}
                          onClick={() => setMode("profile")}
                        >
                          Profile
                        </button>
                      </div>
                      <div className="col-3 col-auto col-sm-2 px-1">
                        <button
                          type="button"
                          className={`btn searchSelection w-100 ${
                            mode === "hashtag" ? "searchSelected" : ""
                          }`}
                          onClick={() => setMode("hashtag")}
                        >
                          Hashtag
                        </button>
                      </div>
                      <div className="col-3 col-auto col-sm-2 px-1">
                        <button
                          type="button"
                          className={`btn searchSelection w-100 ${
                            mode === "location" ? "searchSelected" : ""
                          }`}
                          onClick={() => setMode("location")}
                        >
                          Location
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* {show && modeHelper[mode].searchResults(data)} */}
                </div>
              </div>
            </div>
          </main>
        </div>

        <div className="spacer"></div>
        <div className="container py-5">
          <div className="row justify-content-center mb-4">
            {/* <AboveServiceText /> */}
          </div>
        </div>

        {/*  Service */}
        <div className="spacer"></div>
        {/* <Service /> */}

        {/* Trending Profiles */}
        <div className="spacer mt-5"></div>
        <div className="container py-5">
          <div className="row justify-content-center mb-4">
            <h4>Trending Profiles</h4>
          </div>
          <div className="row">
            <SearchBox users={profiles} homepage />
          </div>
        </div>

        {/* API */}
        <div className="spacer mt-3"></div>
        <div className="bgContainer">
          <div className="container-fluid py-5 bg-svg-revert">
            <div className="row justify-content-center mb-5">
              <h5>Access to our API</h5>
            </div>

            <div className="row justify-content-center ">
              <div className="col-10 col-lg-8 col-auto p-3 request-api">
                <div className="row p-3 align-items-center">
                  <div className="col col-auto">
                    <ClipboardData fontSize="3em" />
                  </div>

                  <div className="col">
                    <p className="m-0">
                      <b>Request access to our API</b>
                    </p>
                    <p className="m-0">
                      Get the rights to include our data in your project.
                    </p>
                  </div>

                  <div className="col-12 col-sm-auto col-lg-2 mx-auto mt-2 mt-sm-0">
                    <Link href="/request-api">
                      <a type="button" className="btn apiButton w-100">
                        Request
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const profiles = await fetchRandomItems({
    type: "profile",
    count: 18,
  });

  return {
    props: {
      profiles,
    },
    // until netlify fixed it
    // 1 minute
    revalidate: 60,
  };
}

export default Home;
