const Sequelize = require('sequelize');
const Experience = require('../../models/Experience');
const Op = Sequelize.Op;

//experiences?filter=constanta&page=2
const getExperiences = async (req, res, next) => {
    try {
        const query = {
            where: {}
        };
    
        if (req.query.filter) {
            query.where = {
                [Op.or]: [
                    {
                        city: { [Op.like]: `%${req.query.filter}%` }
                    },
                    { 
                        transport: { [Op.like]: `%${req.query.filter}%` } 
                    },
                    {
                        start: { [Op.like]: `%${req.query.filter}%` }
                    },
                    {
                        destination: { [Op.like]: `%${req.query.filter}%` }
                    }
                ]
            }
        }
        
        //page with pageSize = 10
        const pageSize = 10;
    
        if (req.query.page) {
            const page = parseInt(req.query.page);
            query.limit = pageSize;
            query.offset = page * pageSize;
        }
        
        const experiences = await Experience.findAll(query);
        res.status(200).json(experiences);
    
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getExperiences
}