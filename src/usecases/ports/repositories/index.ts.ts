export type WithId<T> = { id: string } & T;

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<WithId<T> | null>;
  findById(id: string): Promise<WithId<T> | null>;
}
