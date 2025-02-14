export default interface IFacade<T> {
   create(entidade: T): Promise<T>;
   update(entidade: T): Promise<T>;
   delete(entidade: T): Promise<void>;
   read(entidade: T): Promise<T[]>;
   get(entidade: T): Promise<T>;
}
