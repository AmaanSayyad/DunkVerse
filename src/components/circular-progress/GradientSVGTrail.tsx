function GradientSVGTrail() {
  const idCSS = 'trail';
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS}>
          <stop offset='0%' stopColor='#14ff14' stopOpacity={0.25} />
          <stop offset='100%' stopColor='#f2f202' stopOpacity={0.25} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GradientSVGTrail;
