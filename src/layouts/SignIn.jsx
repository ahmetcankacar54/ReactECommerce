import React from "react";
import { Button } from "react-bootstrap/";

export default function SignIn({ handleSignOut }) {
  return (
    <div>
      <Button onClick={console.log("ucuncu Blok Calisti")} variant="primary">
        Sign In
      </Button>
    </div>
  );
}
