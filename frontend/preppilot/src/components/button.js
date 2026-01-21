const Button = ({ text, variant = "primary" }) => {
  const base = "px-6 py-3 rounded-xl font-semibold transition-all";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  return <button className={`${base} ${styles[variant]}`}>{text}</button>;
};

export default Button;
