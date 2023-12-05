import { useEffect, useState } from "react";
import styles from "./EmailVerify.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mantine/core";

function EmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(
          `http://localhost:4000/api/users/${param.id}/verify/${param.token}`
        );
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmail();
  }, [param]);

  return (
    <div className={styles.container}>
      {validUrl ? (
        <div>
          <h1>Email Verified Succesfully</h1>
          <Link to="/login">
            <Button variant="filled">Login</Button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
}

export default EmailVerify;
