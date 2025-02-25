import AdModel from "../../models/adModel.js";

export default async function globalSearch(_: any, { lat, lng, maxDistance, page, limit, keyword }: any, context: any) {

    try {
        let pageVal = page;
        let limitval = limit || 25;
        if (pageVal == 0) pageVal = pageVal + 1;

        const Ads = await AdModel.aggregate(
            [
                {
                    $search: {
                        "index": "globalSearchIndex",
                        "compound": {
                            "filter": {
                                "geoWithin": {
                                    "circle": {
                                        "center": {
                                            "type": "Point",
                                            "coordinates": [lng, lat]
                                        },
                                        "radius": maxDistance,
                                    },
                                    "path": "adLocation"
                                },
                            },
                            "must": {
                                "autocomplete": {
                                    "query": keyword,
                                    "path": "searchKeyword"
                                }
                            }
                        }
                    }
                },
                {
                    $skip: limitval * (pageVal - 1)
                },
                {
                    $limit: limitval
                },
                {
                    $project: {
                        '_id': 1,
                        'userId': 1,
                        'category': 1,
                        'subCategory': 1,
                        'title': 1,
                        "createdAt": 1,
                        'price': 1,
                        "thumbnail": 1,
                        "subFields": 1,
                        'isActive': 1,
                        "dist": 1,
                        "score": { "$meta": "searchScore" }
                    }
                }]
                );
            if(Ads.length > 0){
                return Ads;
            }else{
                return new Error("Try Another Keyword");
            }
    } catch (e) {
        throw e
    }
}