module.exports = class staticAuthzConfig
{
  constructor(config,dist)
  {
    this.roles=config.roles
  }
  getRoles(msg,func,self)
  {
    return func(null,this.roles)
  }
  checkRole(msg,func,self)
  {
    let dt=msg.data
    let session=msg.session
    if(!session)session={}
    if( session.isAdmin)
    {
      return func(null,true)
    }
    var acc=global.auth[dt.domain]
	// console.log('1--->',dt)
	// console.log('2--->',session)
	// console.log('3--->',acc)
    if(acc && acc[dt.service])
    {
      if(acc[dt.service]=='login')
      {
        if(!session.userid)
          return func(null,false)
        return func(null,true)
      }
      if(acc[dt.service]=='public')
          return func(null,true)
      if(acc[dt.service]&session.roles)
        return func(null,true) 
    }    
    return func(null,false)  
  }
}