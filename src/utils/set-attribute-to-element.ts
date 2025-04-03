export function setStyleProperty({
  element,
  value,
  key,
}: {
  element: HTMLElement;
  key: string;
  value: string;
}) {
  element.style.setProperty(key, value);
}
