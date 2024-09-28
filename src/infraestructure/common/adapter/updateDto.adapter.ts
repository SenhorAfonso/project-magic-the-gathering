export default interface AdapterUpdate<Entity, UpdateDTO> {
  updateToEntity(dto: UpdateDTO): Entity;
}
