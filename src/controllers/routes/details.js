import { getMonthNames, getRouteById, getSchedulesByRoute } from '../../models/model.js';

export default async (req, res) => {
    const { routeId } = req.params;
    const details = await getRouteById(routeId);
    details.schedules = await getSchedulesByRoute(routeId);
    details.operatingMonths = getMonthNames(details.operatingMonths);

    // TODO: getCompleteRouteDetails instead

    res.render('routes/details', { 
        title: 'Route Details',
        details
    });
};