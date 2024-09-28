export default interface AdapterCreate<Entity, CreateDTO> {

  createToEntity(dto: CreateDTO): Entity;
}