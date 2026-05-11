// undefined locales to use the user's locale
export const timeFmt = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});

export const dayFmt = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
});
