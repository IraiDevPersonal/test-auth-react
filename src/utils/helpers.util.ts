export function formDataToObject<T>(formData: FormData) {
  const payload = Object.fromEntries(formData.entries()) as unknown as T;

  return payload;
}
