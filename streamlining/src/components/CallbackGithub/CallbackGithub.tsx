import React, { useEffect } from "react";
import { useUser } from "../../state/user/hooks";
const CallbackGithub: React.FC = () => {
  const { handleCallbackGithub } = useUser();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");

  useEffect(() => {
    if (code) {
      handleCallbackGithub(code);
    }
  }, [code, handleCallbackGithub]);
  return (
    <>
      {/* {code ? (
        async () => {
          await handleCallbackGithub(code!);
        }
      ) : (
        <Navigate to="/login" replace={true} />
      )}
      <Navigate to="/dashboard"/> */}
    </>
  );
};

export default CallbackGithub;
