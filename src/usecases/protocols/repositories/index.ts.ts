export type AlreadyExists<T> = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} & T;

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<AlreadyExists<T> | null>;
  findById(id: string): Promise<AlreadyExists<T> | null>;
  find(data: Partial<T>): Promise<AlreadyExists<T>[] | null>;
  findOne(data: Partial<T>): Promise<AlreadyExists<T> | null>;
}
