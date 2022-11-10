export default function getObjectFromPath(pathArray: string[], value: unknown): Indexed<unknown> {
  return pathArray.reduceRight((acc, item) => ({ [item]: acc }), value as Indexed<unknown>);
}
