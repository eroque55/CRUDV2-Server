export default interface IStrategy<T> {
   execute(entity: T): string;
}
