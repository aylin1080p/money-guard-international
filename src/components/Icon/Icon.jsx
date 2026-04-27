import { iconSpritePath } from '../../constants/assets.js';

function Icon({ name, className = '', width, height }) {
  return (
    <svg className={className} width={width} height={height} aria-hidden="true">
      <use href={`${iconSpritePath}#icon-${name}`} />
    </svg>
  );
}

export default Icon;
