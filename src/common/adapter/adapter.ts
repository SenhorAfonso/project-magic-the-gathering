export default interface Adapter<Entity, CreateDTO, UpdateDTO> {
  createToEntity(dto: CreateDTO): Entity;

  updateToEntity(dto: UpdateDTO): Entity;
}
