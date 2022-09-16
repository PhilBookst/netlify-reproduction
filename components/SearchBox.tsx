import Link from "next/link";
import Image from "next/image";

type Users = {
  username: string;
  profile_pic_url: string;
};

type SearchBoxProps = {
  users: Users[];
  homepage?: boolean;
};

const SearchBox = ({ users, homepage = false }: SearchBoxProps) => {
  if (users) {
    return (
      <div className="container pt-5 searchBox">
        <div className="row justify-content-center">
          {users &&
            users.map((user, index) => {
              return (
                <div
                  className={
                    homepage ? "col-6 col-md-2 mb-5" : "col-6 col-md-3 mb-5"
                  }
                  key={index}
                >
                  <Link
                    href={"/profile/" + encodeURIComponent(user.username)}
                    passHref
                    prefetch={false}
                  >
                    <a>
                      <div className="profileBox text-center">
                        <Image
                          alt=""
                          src={user.profile_pic_url}
                          width={100}
                          height={100}
                          priority
                        />
                        <p className="mt-2 text-dark">{user.username}</p>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container pt-5 searchBox">
        <p className="text-center">No matching profiles found.</p>
      </div>
    );
  }
};

export default SearchBox;
