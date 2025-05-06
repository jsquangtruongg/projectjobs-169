import styles from "./InputProfileComponent.module.css";
interface InputProfileComponent {
  name: string;
  text?: string;
}

export const InputTextProfileComponent: React.FC<InputProfileComponent> = (
  props
) => {
  const { name, text } = props;
  const truncateWords = (str: string, wordLimit: number) => {
    const words = str.split(" ");
    if (words.length <= wordLimit) return str;
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  return (
    <div className={styles.item_enter_information}>
      <p className={styles.item_text}>{name} </p>
      <div className={styles.item_enter}>
        <p className={styles.enter_input}> {truncateWords(text || "", 10)} </p>
      </div>
    </div>
  );
};

interface SelectTextComponentProps {
  name: string;
  options: string[];
  value?: string;
}
export const SelectTextComponent: React.FC<SelectTextComponentProps> = (
  props
) => {
  const { name, options, value } = props;
  return (
    <div>
      <p>{name}</p>
      <div className={styles.item_enter}>
        <select className={styles.item_select} value={value} name="" id="">
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
