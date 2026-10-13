import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion, getRoutesBySeason } from '../../models/model.js';

export default async (req, res) => {
    const region = req.query.region || '';
    const season = req.query.season || '';

    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    let routes = [];

    if (region && season) {
        const regionRoutes = await getRoutesByRegion(region);
        const seasonRoutes = await getRoutesBySeason(season);
        routes = regionRoutes.filter(route => 
            seasonRoutes.some(s => s.id === route.id)
        );
    } else if (region) {
        routes = await getRoutesByRegion(region);
    } else if (season) {
        routes = await getRoutesBySeason(season);
    } else {
        routes = await getAllRoutes();
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};