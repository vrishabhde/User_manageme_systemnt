import AwdizToken from "../models/AwdizToken";
import uuid from "uuidv4";
import { CronJob } from "cron";



let job = new CronJob('* * * * * *', async()=>{

        let access_token = uuid();
    const generatetoken = await AwdizToken.find({}).exec();
    
    if(generatetoken.length) return resizeBy.send("token already exist");

    const newtoken = new AwdizToken({

        access_token:access_token
    })
    await newtoken.save();
    console.log("token generated");

}
)

job.start();