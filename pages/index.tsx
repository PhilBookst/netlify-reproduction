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
