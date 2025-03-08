import errorImg from "../assets/error_404.svg";

export default function NoPage() {
  return (
    <img
      src={errorImg}
      height={350}
      width={700}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        alignSelf: "center",
      }}
      alt="error image"
    />
  );
}
