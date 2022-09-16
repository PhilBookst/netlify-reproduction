import SearchBox from "components/SearchBox";
import { fetchRandomItems } from "lib/data-fetching";

function Home({ profiles }) {
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
