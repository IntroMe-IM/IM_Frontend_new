import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DropDownMenu.module.css';

function DropdownMenu({ options, isVisible })
{
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionClick = (option) =>
  {
    setSelectedOption(option);
    navigate(option.path);
  };

  return (
    <div className={`${styles.dropdown} ${isVisible ? styles.show : styles.hide}`}>
      <ul className={styles.dropdownMenu}>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownMenu;
