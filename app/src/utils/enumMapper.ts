export function mapEnum<T>(enumType: T, value: keyof T): T[keyof T] {
   return enumType[value];
}
