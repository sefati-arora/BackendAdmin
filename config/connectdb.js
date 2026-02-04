const Sequelize=require("sequelize")
const sequelize=new Sequelize('dbAdmin','root','password',
    {
        host:"localhost",
        dialect:"mysql"
    }
);
const connectdb=async()=>
{
   await sequelize.authenticate().then(
            async () =>
            {
                await sequelize.sync({alter:false})
                console.log("db connected")
            }
        )
        .catch((error) =>
        {
            console.log("Unable to connect",error)
        })
}
module.exports=
{
    connectdb:connectdb,
    sequelize:sequelize
}