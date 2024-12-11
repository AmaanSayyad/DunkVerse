function GradientSVGPath() {
  const idCSS = 'path';
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS}>
          <stop offset='0%' stopColor='#17FF16' />
          <stop offset='100%' stopColor='#F4F302' />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GradientSVGPath;
