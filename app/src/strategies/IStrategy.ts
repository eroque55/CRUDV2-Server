import DomainEntity from "../models/DomainEntity";

export default interface IStrategy {
   execute(entity: DomainEntity): string;
}
