

/**
 * Identifica un elemento con un identificador y un nombre
 * esto es usado para identificar entidades en el filtro.
 * a diferencia de IEntityNameIndex, el index es un string.
 */
export default interface IEntityNameId {
    index: string;
    title: string;
}
