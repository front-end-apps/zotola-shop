import Button from "../Components/Button";
const NotFound = () => {
  return (
    <div className="container align-center">
      <a href="/" className="page-404">
        <h1>We're working on something great! Stay tuned!</h1>
        <Button text="Goto Home" solid={true}/>
      </a>
    </div>
  );
};

export default NotFound;
