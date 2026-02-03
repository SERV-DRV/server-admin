import Team from "./teams.model.js";

export const getTeams = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive } = req.query;
        const filter = { isActive };
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
        };

        const teams = await Team.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(options.sort);

        const total = await Team.countDocuments(filter);

        res.status(200).json({
            succes: true,
            data: teams,
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
            message: 'Error al obtener los equipos',
            error: error.message
        });
    }
}

export const createTeam = async (req, res) => {
    try {
        const teamData = req.body;

        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const fileName = req.file.filename;

            const relativePath = fileName.substring(
                fileName.indexOf('teams/')
            );

            teamData.logo = `${relativePath}.${extension}`;
        } else {
            teamData.logo = 'teams/kinal_sport_nyvxo5';
        }

        const team = new Team(teamData);
        await team.save();

        res.status(201).json({
            succes: true,
            message: 'Equipo creado exitosamente',
            data: team
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error al crear el equipo',
            error: error.message
        });
    }
}