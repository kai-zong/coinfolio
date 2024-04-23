import { useEffect } from "react";
import { useUserAndPriceTable } from "../UserAndPriceTableContext";
import { useNavigate } from "react-router-dom";
import config from "../config";

export default function VerifyUser() {
  const navigate = useNavigate();
  const { accessToken } = useUserAndPriceTable();

  useEffect(() => {
    async function verifyUser() {
      // make a call to our API to verify the user in our database, if it doesn't exist we'll insert it into our database
      // finally we'll redirect the user to the /app route
      const data = await fetch(`${config.REACT_APP_API_URL}/verify-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const user = await data.json();

      if (user.auth0Id) {
        navigate("/portfolio");
      }
    }

    if (accessToken) {
      verifyUser();
    }
  }, [accessToken, navigate]);

  return <div className="loading">Loading...</div>;
}
