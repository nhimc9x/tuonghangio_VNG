export const CHAMP: CHAMPTYPE[] =
  [
    { id: "natra", name: "Na Tra", img: "natra.png", icon: "ic_natra.png" },
    { id: "dethinh", name: "Đế Thính", img: "de.png", icon: "ic_dethinh.png" },
    { id: "dmv", name: "Đại Minh Vương", img: "dai.png", icon: "ic_dmv.png" },
    { id: "cuulinh", name: "Cửu Linh", img: "cuu.png", icon: "ic_cuulinh.png" },
  ]

export type CHAMPTYPE = {
  id: string;
  name: string;
  img: string;
  icon: string;
}
