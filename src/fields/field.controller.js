// Importamos ñas dependencias
import Field from "./field.model.js";

// Controles
export const getFields = async (req, res) => {
    try {

        const { page = 1, limit = 10, isActive } = req.query;

        // Variable para filtrar
        // Depende si es active o inactive
        const filter = { isActive };

        // Opciones de paginación
        const options = {
            //Convertimos a numero
            page: parseInt(page),
            //Convertimos a numero
            limit: parseInt(limit),
            sort: { createdAt: -1 },
        };

        // Realizar la consulta del Schema field
        const fields = await Field.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(options.sort);

        // Contar el total de documentos
        const total = await Field.countDocuments(filter);

        // Enviar la respuesta
        res.status(200).json({
            succes: true,
            data: fields,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: limit
            }
        });

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al obtener los campos',
            error: error.message
        });
    }
}




// Post controller 
export const createField = async (req, res) => {
    try {
        const fieldData = req.body;

        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const fileName = req.file.filename;

            const relativePath = fileName.substring(
                fileName.indexOf('fields/')
            );
    
        fieldData.photo = `${relativePath}.${extension}`;
        } else {
            fieldData.photo = 'fields/kinal_sport_nyvxo5';
        }

        const field = new Field(fieldData);
        await field.save();

        res.status(201).json({
            succes: true,
            message: 'Campo creado exitosamente',
            data: field
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al crear el campo',
            error: error.message
        })
    }
};