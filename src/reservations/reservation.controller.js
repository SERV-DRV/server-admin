import Reservation from "./reservation.model.js";

export const getReservations = async (req, res) => {
    try {

        const { page = 1, limit = 10, isActive } = req.query;

        const filter = { isActive };

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
        };

        const reservations = await Reservation.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(options.sort);

        const total = await Reservation.countDocuments(filter);

        res.status(200).json({
            succes: true,
            data: reservations,
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
            message: 'Error al obtener las reservas',
            error: error.message
        });
    }
}




export const createReservation = async (req, res) => {
    try {
        const reservationData = req.body;

        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const reservationName = req.file.reservationname;

            const relativePath = reservationName.substring(
                reservationName.indexOf('reservations/')
            );
    
        reservationData.photo = `${relativePath}.${extension}`;
        } else {
            reservationData.photo = 'reservations/kinal_sport_nyvxo5';
        }

        const reservation = new Reservation(reservationData);
        await reservation.save();

        res.status(201).json({
            succes: true,
            message: 'Reserva creada exitosamente',
            data: reservation
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al crear la reserva',
            error: error.message
        })
    }
};