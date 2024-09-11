import styles from "./InputProfileComponent.module.css";
interface InputProfileComponent {
  name: string;
  placeholder?: string;
}

export const InputTextProfileComponent: React.FC<InputProfileComponent> = (
  props
) => {
  const { name, placeholder } = props;
  return (
    <div className={styles.item_enter_information}>
      <p>{name}</p>
      <div className={styles.item_enter}>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.enter_input}
        />
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
