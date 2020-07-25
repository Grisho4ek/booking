export interface IFormField<T> {
  name: keyof T;
  type: string;
  label: string;
}
