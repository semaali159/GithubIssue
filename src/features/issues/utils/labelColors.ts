export function getLabelColors(hex: string) {
  const valid = /^[0-9a-f]{6}$/i.test(hex) ? hex : "6b7280";
  const r = parseInt(valid.slice(0, 2), 16);
  const g = parseInt(valid.slice(2, 4), 16);
  const b = parseInt(valid.slice(4, 6), 16);
  const darken = (value: number) => Math.round(value * 0.55);

  return {
    background: `rgba(${r}, ${g}, ${b}, 0.15)`,
    ring: `rgba(${r}, ${g}, ${b}, 0.4)`,
    text: `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`,
  };
}