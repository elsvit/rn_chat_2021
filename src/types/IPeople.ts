export interface IPeopleRaw {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[]; //url[]
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string; //url
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[]; //url[]
  url: string;
  vehicles: string[]; //url[]
}

export interface IPeople extends IPeopleRaw {
  idx: number;
}
