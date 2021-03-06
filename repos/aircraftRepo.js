import _ from 'lodash'
import { prisma } from 'db'

export const aircraftRepo = {
    findAll,
    findById,
    findByIdentifier,
    searchForIdentifier,
    create,
    update,
    delete: _delete,
    findAllAircraftClass: findAllAircraftClass,
    findAircraftTypeById: findAircraftTypeById,
}

async function findAll(opts) {
    let query = {}

    if (opts?.include) {
        query.include = opts.include
    }
    console.log(query)

    return await prisma.aircraft.findMany(query)
    .then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function findById(id, opts) {
    if (!id) throw 'No ID provided'

    let query = {
        where: {
            id: (typeof id !== 'number') ? parseInt(id) : id
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.aircraft.findUnique(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function searchForIdentifier(q, opts) {
    if (!q) throw 'No Query provided'
    
    let query = {
        where: {
            identifier: {
                contains: q
            }
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.aircraft.findMany(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function findByIdentifier(identifier, opts) {
    if (!identifier) throw 'No Identifier provided'

    let query = {
        where: {
            identifier: identifier
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.aircraft.findUnique(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}


async function create(data, opts) {
    if (!data) throw 'No data provided'
    data = (typeof data === 'string') ? JSON.parse(data) : data
    
    let query = {
        data: {
            shortName: data.shortName,
            identifier: data.identifier.toUpperCase(),
            aircraftType: {
                connect: {
                    id: parseInt(data.aircraftTypeId),
                }
            }
        },
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.aircraft.create(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function update(id, data, opts) {
    if (!id) throw 'No ID provided'
    if (!data) throw 'Nothing being updated'

    let x = (typeof data === 'string') ? JSON.parse(data) : data
    
    let query = {
        where: { id: (typeof id !== 'number') ? parseInt(id) : id },
        data: {
            shortName: data.shortName,
            identifier: data.identifier.toUpperCase(),
            aircraftType: {
                connect: {
                    id: parseInt(data.aircraftTypeId),
                }
            },
            updatedAt: new Date(),
        },
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.aircraft.update(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function _delete(id, opts) {
    if (!id) throw 'No ID provided'

    let query = {
        where: {
            id: (typeof id !== 'number') ? parseInt(id) : id
        }
    }

    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.aircraft.delete(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function findAllAircraftClass(opts) {

    let query = {}
    if (opts?.include) {
        query.include = opts.include
    }

    return await prisma.aircraftClass.findMany(query).then((x) => {
        if (opts.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

async function findAircraftTypeById(id, opts) {
    if (!id) throw 'No ID provided'
    
    let query = {
        where: {
            id: (typeof id !== 'number') ? parseInt(id) : id
        },
    }
    
    if (opts?.include) {
        query.include = opts.include
    }
    

    return await prisma.aircraftType.findUnique(query).then((x) => {
        if (opts?.stringify) {
            return JSON.parse(JSON.stringify(x))
        } else {
            return x
        }
    })
}

export default aircraftRepo