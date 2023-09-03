export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
}
