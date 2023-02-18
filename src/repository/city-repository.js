const { City } = require('../models/index');

class CityRepository {

    async createCity({ name }) {
        try {
            const city = await City.create({name});
            return city;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw {error};
        }
    }

    async deleteCity(cityId) {
        try {
            await City.destroy({
                where: {
                    id: cityId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw {error};
        }
    }

    async updateCity(cityId, data) { //{name: "Prayagraj"}
        try {
            // The below approach also works but it won't return the updated object for MySQL
            // If we are using PostgreSQL then passing returning: true and plain:true works
            // const city = await City.update(data, {
            //     where: {
            //         id: cityId
            //     },
            //     returning: true,
            //     plain: true
            // });

            // to get the updated data in MySQL we use the below approach
            const city = await City.findByPk(cityId);
            city.name = data.name;
            await city.save();
            return city;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw {error};
        }
    }

    async getCity(cityId) {
        try {
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw {error};
        }
    }

    async getAllCities() {
        try {
            const cities = await City.findAll();
            return cities;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw {error};
        }
    }
}

module.exports = CityRepository;