import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../state/user/hooks";
const CallbackGithub: React.FC = () => {
  const { handleCallbackGithub ,user } = useUser();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard',{replace : true});
    }
    if (code) {
      handleCallbackGithub(code)
    }
  }, [user]);
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
