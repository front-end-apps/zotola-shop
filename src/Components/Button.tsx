import "../styles/button.scss";

type ButtonProps = {
  text: string;
  icon?: string;
  solid?: boolean;
};

function Button({ text, icon, solid }: ButtonProps): JSX.Element {
  return (
    <button className={solid ? 'solid' : ''}>
      {icon && <img src={icon} alt="" />}
     <span> {text}</span>
    </button>
  );
}

export default Button;
