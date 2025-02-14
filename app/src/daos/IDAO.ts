export default interface IDAO<T> {
   create(entity: T): Promise<T>;
   read(entity: T): Promise<T[]>;
   update(entity: T): Promise<T>;
   delete(entity: T): Promise<void>;
   get(entity: T): Promise<T>;
}
