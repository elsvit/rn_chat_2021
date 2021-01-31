export interface IGroupRaw {
  climate: string; // "arid"
  created: string; // "2014-12-09T13:50:49.641000Z"
  diameter: string; // "10465"
  edited: string; //"2014-12-20T20:58:18.411000Z"
  films: string[]; //["http://swapi.dev/api/films/1/", "http://swapi.dev/api/films/3/", "http://swapi.dev/api/films/4/",…]
  gravity: string; //"1 standard"
  name: string; // "Tatooine"
  orbital_period: string; //"304"
  population: string; // "200000"
  residents: string[]; //["http://swapi.dev/api/people/1/", "http://swapi.dev/api/people/2/", "http://swapi.dev/api/people/4/",…]
  rotation_period: string; //"23"
  surface_water: string; //"1"
  terrain: string; // "desert"
  url: string; //"http://swapi.dev/api/planets/1/"
}

export interface IGroup extends IGroupRaw {
  idx: number;
}
