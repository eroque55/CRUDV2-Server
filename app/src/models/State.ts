import City from "./City";
import Country from "./Country";
import DomainEntity from "./DomainEntity";

export default class State extends DomainEntity {
   private name: string = "";
   private country: Country = new Country();
   private cities: City[] = [];

   get Name(): string {
      return this.name;
   }

   set Name(nome: string) {
      this.name = nome;
   }

   get Country(): Country {
      return this.country;
   }

   set Country(country: Country) {
      this.country = country;
   }

   get Cities(): City[] {
      return this.cities;
   }

   set Cities(cities: City[]) {
      this.cities = cities;
   }
}
