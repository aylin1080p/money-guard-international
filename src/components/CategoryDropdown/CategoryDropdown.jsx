import { useEffect, useRef, useState } from 'react';

import Icon from '../Icon/Icon.jsx';
import './CategoryDropdown.css';

function CategoryDropdown({ value, onChange, options, placeholder = 'Select a category', error }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const onOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    const onEsc = e => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const handleSelect = val => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`cat-dd${isOpen ? ' cat-dd--open' : ''}${error ? ' cat-dd--error' : ''}`} ref={ref}>
      <button
        type="button"
        className="cat-dd__trigger"
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selected ? 'cat-dd__value' : 'cat-dd__placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon
          name="chevron-down"
          className={`cat-dd__chevron${isOpen ? ' cat-dd__chevron--up' : ''}`}
          width={16}
          height={16}
        />
      </button>

      {isOpen && (
        <ul className="cat-dd__list" role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`cat-dd__option${opt.value === value ? ' cat-dd__option--active' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryDropdown;
