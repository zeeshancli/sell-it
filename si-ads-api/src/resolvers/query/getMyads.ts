import AdModel from "../../models/adModel.js";

export default async function getMyAds(_: any, args: any, context: any) {
  try {

    const { me } = context;
    const { userId } = me;
  
    if (!userId) return new Error("Please Login");
    const Ads = await AdModel.aggregate(
        [
            {
              '$match': {
                'userId': userId
              }
            }, {
              '$facet': {
                'Selling': [
                  {
                    '$match': {
                      'adStatus': "Selling"
                    }
                  }, {
                    '$sort': {
                      'adStatus': -1
                    }
                  }
                ],
                'Archived': [
                  {
                    '$match': {
                      'adStatus': "Archived"
                    }
                  }, {
                    '$sort': {
                      'ArchivedAt': -1
                    }
                  }
                ], 
                'Expired': [
                  {
                    '$match': {
                      'adStatus': "Expired"
                    }
                  }, {
                    '$sort': {
                      'expireAt': -1
                    }
                  }
                ], 
                'Deleted': [
                  {
                    '$match': {
                      'adStatus': "Deleted"
                    }
                  }, {
                    '$sort': {
                      'deletedAt': -1
                    }
                  }
                ], 
                'Sold': [
                  {
                    '$match': {
                      'adStatus': 'Sold'
                    }
                  }, {
                    '$sort': {
                      'soldAt': -1
                    }
                  }
                ]
              }
            }
          ]
        );
    return Ads
  } catch (e) {
    throw e
  }
}