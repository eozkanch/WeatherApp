// Harf (unicode), rakam, boşluk, virgül, nokta, tire, kesme işareti
export const CITY_PATTERN = /^[\p{L}\p{M}\d\s,.'’-]{1,80}$/u;

/** Geçerli bir şehir adıysa kırpılmış halini, değilse null döndürür. */
export function parseCityName(value: string | null): string | null {
  const city = value?.trim();
  return city && CITY_PATTERN.test(city) ? city : null;
}
