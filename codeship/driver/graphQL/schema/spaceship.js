module.exports = {
  name: 'Spaceship',
  schema:
  `
  type SpaceshipConfig {
    fuselage:String,
    propulsionEngine:String,
    takeoff:String
  }
  type Spaceship {
    _id:String,
    config:SpaceshipConfig,
    name:String,
    goal:String,
    goal_explanation:String,
    goal_reason:String,
    owner:String,
    createdAt:String
  }`,
  querySchema:
  `
  spaceships(pId:String, pCreatedAt:String, pFirst:Int, pLast:Int, pAfter:Int, pBefore:Int):SpaceshipConnection
  spaceship(pOwner:String, pId:String):Spaceship
  `
}