import React from "react";

import { parseCookies } from "nookies";

const HeyUser = () => {
  const cookieuser = parseCookies();
  const user = cookieuser.username ? cookieuser.username : "";

  return (
    <div>
      {user && (
        <h1 className="heading mt-16">
          Hey <h1 className="heading text-red-600 inline-block">{user}</h1>,
          Welcome to Rasoi!
        </h1>
      )}
    </div>
  );
};

export default HeyUser;
