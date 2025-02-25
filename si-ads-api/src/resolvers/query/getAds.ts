import AdModel from "../../models/adModel.js";

export default async function getAds(_: any, { lat, lng, maxDistance, page, limit}: any, context: any) {
  try {

    const { me } = context;
    const { userId } = me;
    let pageVal = page;
    let limitval = limit || 25;
    if (pageVal == 0) pageVal = pageVal + 1
  
    if (!userId) return new Error("Please Login");
    const Ads = await AdModel.aggregate([
      {
        '$geoNear': {
          'near': { type: 'Point', coordinates: [lng, lat] },
          "distanceField": "dist.calculated",
          'maxDistance': maxDistance || 10000,
          "includeLocs": "dist.location",
          'spherical': true
        }
      },
      {
        '$project': {
          '_id': 1,
          'userId':1,
          'category': 1,
          'subCategory': 1,
          'title': 1,
          "createdAt": 1,
          'price': 1,
          "thumbnail": 1,
          'isActive': 1,
          "dist": 1,
        }
      },
      {
        $sort: {
          "createdAt": -1,
          "dist.calculated": -1
        }
      },
      {
        $skip: limitval * (pageVal - 1)
      },
      {
        $limit: limitval
      },
    ]);
    return Ads;
  } catch (e) {
    throw e
  }
}