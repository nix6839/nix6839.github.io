export default function getUrl(path: string): string {
  return new URL(path, 'https://washnix.com/').href;
}
