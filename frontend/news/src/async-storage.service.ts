// storage service for demo pages
export const storageService = {
	query,
	get,
	post,
	put,
	remove,
	postMany
}

type EntityType = 'articles' | 'contacts' | 'todos'
interface Entity extends Object {
	_id: string
}

function query(entityType: EntityType, delay = 50): Promise<Entity[]> {
	var entities = JSON.parse(localStorage.getItem(entityType)!) || []

	return new Promise((resolve, _reject) => {
		setTimeout(() => resolve(entities), delay)
	})
}

async function get(entityType: EntityType, entityId?: string) {
	const entities = await query(entityType)
	return entityId ? entities.find((entity) => entity._id === entityId) : entities
}

async function post(entityType: EntityType, newEntity: Entity) {
	newEntity._id = _makeId()
	return query(entityType).then((entities) => {
		entities.push(newEntity)
		_save(entityType, entities)
		return newEntity
	})
}

async function put(entityType: EntityType, updatedEntity: Entity) {
	const entities = await query(entityType)
	const entityIdx = entities.findIndex((entity) => entity._id === updatedEntity._id)
	entities.splice(entityIdx, 1, updatedEntity)
	_save(entityType, entities)
	return updatedEntity
}

async function remove(entityType: EntityType, entityId: string) {
	const entities = await query(entityType)
	const entityIdx = entities.findIndex((entity) => entity._id === entityId)
	entities.splice(entityIdx, 1)
	_save(entityType, entities)
}

async function postMany(entityType: EntityType, newEntities: Entity[]) {
	newEntities = newEntities.map((entity) => (entity._id ? entity : { ...entity, _id: _makeId() }))
	const entities = await query(entityType)
	entities.push(...newEntities)
	_save(entityType, entities)
	return entities
}

function _save(entityType: EntityType, entities: Entity[]) {
	localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
	var text = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}
