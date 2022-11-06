export default function getObjectFromPath(pathArray: string[], value: unknown): Indexed {
  return pathArray.reduceRight((acc, item) => ({ [item]: acc }), value as unknown as any);
}
