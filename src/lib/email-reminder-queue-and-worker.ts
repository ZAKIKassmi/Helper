import {connection} from '@/lib/redis-connection';
import { Queue, Worker } from 'bullmq';
import { mailOptions, transporter } from "./nodemailer";

const emailQueue = new Queue('emailQueue', {
  connection,
  
});



export default emailQueue;


const emailWorker = new Worker('emailQueue', async(job)=>{
  const {email, appointmentDate, firstName, lastName} = job.data;
  console.log(`Job is being processed by worker: ${job.id}`);



  await transporter.sendMail({
    ...mailOptions,
    to: email,
    subject: "Helper Appointment Reminder.",
    html:`
        <div style="display: flex; flex-direction: column; width: 100%; justify-content: center; align-items: center;">
          <div style="max-width: 500px; width: 100%; padding: 16px; margin: 16px auto; ">
            <h1 style="font-size: 24px; font-weight: bold; color: #EF4444; text-align: center;">
              Helper*
            </h1>
            <div style="margin-bottom: 24px;">
              <h2 style="font-size: 20px; font-weight: 600; color: #1F2937; margin-bottom: 8px;">
                Hello ${firstName} ${lastName},
              </h2>
              <p>This is a helper reminder for your upcomming blood donation appointemnt on ${appointmentDate}</p>
            </div>
            
          </div>
        </div>
      `,
  });

  }, 
  {connection,}
);

emailWorker.on("completed", (job)=>{
  console.log(`Job completed for ${job.id}!`);
})

emailWorker.on('failed', (job, err) => {
  console.error(`Job Failed:\n Job id=${job?.id} \n Error: ${err}`);
});


export {emailWorker};