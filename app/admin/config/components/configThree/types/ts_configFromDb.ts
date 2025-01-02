export default interface ts_configFromDb {
  id: number;
  name: string;
  description: string;
  idParent: number | null;
}
