/*
|--------------------------------------------------------------------------
| CENTRAL IMAGE MAP
|--------------------------------------------------------------------------
| Filenames match the folders in  public/images/{jobs,design,uradi}
| EXACTLY (case-sensitive on Linux / Vercel). `fallback` is an image that
| already existed in the project, used only if the primary file is absent.
|--------------------------------------------------------------------------
*/

export type Pic = { src: string; fallback: string };

const pic = (src: string, fallback: string): Pic => ({ src, fallback });

/** Ready-made recruitment flyers  ->  public/images/jobs */
export const flyers = {
  airportLoadersSaudi: pic("/images/jobs/airportloadersaudi.jpeg", "/images/jobs/warehosue.png"),
  femaleDriversSaudi: pic("/images/jobs/femaledriversaudi.jpeg", "/images/jobs/driverslady.png"),
  houseManagerQatar: pic("/images/jobs/housemanagerqatar.jpeg", "/images/jobs/cleaner.png"),
  houseToHouseQatar: pic("/images/jobs/housetohouseqatar.jpeg", "/images/jobs/cleanerdesign2.png"),
  nailTechQatar: pic("/images/jobs/naitechqatar.jpeg", "/images/jobs/cleanerdesign2.png"),
} as const;

/** Category photography  ->  public/images/uradi */
export const uradi = {
  agriculture: pic("/images/uradi/agriculture.png", "/images/jobs/men.png"),
  beauty: pic("/images/uradi/beauty.jpg", "/images/jobs/cleanerdesign2.png"),
  caregiver: pic("/images/uradi/caregiver.jpg", "/images/jobs/caregiver.png"),
  cleaning: pic("/images/uradi/cleaning.png", "/images/jobs/mencleaners.png"),
  construction: pic("/images/uradi/construction.png", "/images/jobs/men.png"),
  domesticWorker: pic("/images/uradi/domesticworker.png", "/images/jobs/cleaner.png"),
  driver: pic("/images/uradi/driver.png", "/images/jobs/drivers.png"),
  electrician: pic("/images/uradi/electrician.png", "/images/jobs/men.png"),
  engineering: pic("/images/uradi/engineering.png", "/images/jobs/men.png"),
  factories: pic("/images/uradi/factories.png", "/images/jobs/warehosue.png"),
  hospitality: pic("/images/uradi/hospitality.png", "/images/jobs/cheef.png"),
  // NB: "manufaturing.png" is spelled exactly like the file in your folder.
  manufacturing: pic("/images/uradi/manufaturing.png", "/images/jobs/warehosue.png"),
} as const;

/** Travel / brand artwork  ->  public/images/design */
export const design = {
  coolPlane: pic("/images/design/coolplane.png", "/images/design/plane.png"),
  dubaiPlane: pic("/images/design/dubaiplane.png", "/images/design/image1.png"),
  qatarPassport: pic("/images/design/qatarpassport.png", "/images/design/image3.png"),
  uaePlane: pic("/images/design/uaeplane.png", "/images/design/image2.png"),
  plane: pic("/images/design/plane.png", "/images/design/image1.png"),
  image1: pic("/images/design/image1.png", "/images/design/plane.png"),
  image2: pic("/images/design/image2.png", "/images/design/plane.png"),
  image3: pic("/images/design/image3.png", "/images/design/plane.png"),
  image4: pic("/images/design/image4.png", "/images/design/plane.png"),
  image5: pic("/images/design/image5.png", "/images/design/plane.png"),
} as const;

export const GENERIC_FALLBACK = "/images/jobs/men.png";
