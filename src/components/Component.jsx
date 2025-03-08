import { useState } from "react";
import styled from "styled-components";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";




export const Container = styled.div`
display:block;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 40%;
  
  z-index: 1;
  
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
`;

export const Form = styled.form`
  
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #F9F9F9;
  padding: 50px;
  height: 100%;
`;

export const Title = styled.h1`
  
  margin: 0 0 30px;
`;

export const logo = styled.img`
float: right;
  margin: 28px;
  height: 70px;
  padding: 4px 6px;

@media only screen and (max-width: 640px) {
  display: block; 
    margin: 0 auto;
    margin-left: 5px;
    position: relative;
  top: 0;
  left: 0;
  transform: none;
}
`;
export const txt = styled.img`
float: left;
  margin-left: 28px;
  font-size: 1.5em;
  height: 30px;
@media only screen and (max-width: 640px) {
  display: none;
}
`;

export const Input = styled.input`
  background-color: #fff;
  border: none;
  border-radius: 13px;
  padding: 12px 19px;
  margin: 8px 0;
`;

export const Button = styled.button`
  border-radius: 10px;
  border: 1px solid #80542F;
  background-color: #80542F;
  color: #ffffff;
  font-size: 15px;
  margin: 12px 30px;
  padding: 12px 45px;
  letter-spacing: 1px;

  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #000036;
  color: #000036;
`;

export const Anchor = styled.a`
  color: #5F5834;
  font-size: 14px;
  text-decoration: none;
  display: inline;
  float: right;
  &:hover{
    color: #000;
  }
`;
export const OverlayContainer = styled.div`
  position: absolute;
  background-color: #fff;
  top: 0;
  left: 100%;
  width: 60%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
    
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  padding: 0 19px;
`;

export const Label = styled.label`
  margin: 15px 0;
`;
export const LabelText = styled.span`
  margin: 15px 0 0 5px;
  text-align: center;
`;

export const Text = styled.a`
  display: inline;
  margin: 0 5px;
  color: #80542F;
  text-decoration: none;
`;
export const FacebookButton = () => {
  const [profile, setProfile] = useState(null);
  return (
    <div>
      {!profile ? (
        <LoginSocialFacebook
          appId="1156867282415337"
          onResolve={(response) => {
            console.log(response);
            setProfile(response.data);
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      ) : (
        ""
      )}

      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <img src={profile.picture.data.url} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const GoogleButton = () => {
    const [profile, setProfile] = useState(null);
    return (
      <div>
        <LoginSocialGoogle
        client_id={"138604734519-pu8348iija7t45a712e9hdv7sjgvkt64.apps.googleusercontent.com"}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
      </div>
    );
  };
export const line = styled.div`    
    text-align: center;
align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  height: 1px;
  width: 100%;
  margin: 36px 0;
  background-color: #d3d3d3;
  &:before{
    content: 'or';
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #F9F9F9;
    color: #A97155;
    padding: 0 6px;
   

  }
`;