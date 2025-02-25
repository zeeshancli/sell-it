import { gql } from 'graphql-tag'

const typeDefs = gql`#graphql

  scalar JSON
  type Ad {

    _id:String
    userId:String
    category: String
    subCategory: String
    title: String
    price: String
    description: String
    isNegotiable: Boolean
    adLocation:JSON
    adAddress:String
    subFields: JSON
    specialKeywords: [String]
    images: [String]
    videos: [String]
    thumbnail: String
    dist:JSON
  }

  type myAds {
    Selling : [Ad]
    Archived : [Ad]
    Deleted : [Ad]
    Expired : [Ad]
    Sold : [Ad]
  }
  
  type Query {
    getAds(lat:Float!, lng:Float!, maxDistance:Float, page:Int, limit:Int): [Ad]
    globalSearch(lat:Float!, lng:Float!, maxDistance:Float,keyword:String , page:Int, limit:Int): [Ad]
    getAdDetail(id:String): Ad
    getMyAds: [myAds]
  }
  
  input AdInput {
    category: String
    subCategory: String
    title: String
    price: String
    description: String
    isNegotiable: Boolean
    adLocation:JSON
    adAddress:String
    subFields: JSON
    specialKeywords: [String]
    images: [String]
    videos: [String]
    thumbnail: String
  }

  input updateAdInput {
    id:String
    title: String
    price: String
    description: String
    subFields: JSON
    specialKeywords: [String]
    images: [String]
    videos: [String]
    thumbnail: String
  }

  input reportAdInput {
    id:String
    message:String
  }

  input updateAdStatusInput {
    id: String
    status: String
  }

  type Mutation {
    createAd(input: AdInput): Ad
    updateAd(input: updateAdInput ): Boolean
    reportAd(input: reportAdInput ): Boolean
    updateAdStatus(input: updateAdStatusInput ): Boolean
  }

`;

export default typeDefs;